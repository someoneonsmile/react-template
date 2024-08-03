import { mergeDeepLeft } from 'ramda'

interface StoreItemOptions<T> {
  defaultValue?: T
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  onError?: (e: unknown) => void
}

function defaultOptions<T>() {
  return {
    serializer: (value: T) => {
      return JSON.stringify(value)
    },
    deserializer: (value: string) => {
      return JSON.parse(value)
    },
    onError: (e: unknown) => {
      console.log(e)
    },
  }
}

const getStorage = () => {
  return localStorage
}

export class StoreItem<T> {
  private key: string
  private storage?: Storage
  private options: KeyNonNullable<StoreItemOptions<any>, 'defaultValue'>

  constructor(key: string, options?: StoreItemOptions<T>) {
    this.key = key
    this.options = mergeDeepLeft(options || {}, defaultOptions())

    try {
      this.storage = getStorage()
    } catch (err) {
      this.options.onError(err)
    }
  }

  public get(defaultValue?: T): Option<T> {
    try {
      const v = this.storage?.getItem(this.key)
      if (v) {
        return this.options.deserializer(v)
      }
    } catch (e) {
      this.options.onError(e)
    }
    return defaultValue ?? this.options.defaultValue
  }

  public set(value: T) {
    try {
      this.storage?.setItem(this.key, this.options.serializer(value))
    } catch (e) {
      this.options.onError(e)
    }
  }

  public clear() {
    try {
      this.storage?.removeItem(this.key)
    } catch (e) {
      this.options.onError(e)
    }
  }
}
