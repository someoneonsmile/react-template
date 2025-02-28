export interface Serializer<F, T> {
  encode: (value: F) => T
  decode: (value: T) => F
}

export interface StoreItemOptions<T> {
  defaultValue: T
  serializer?: Serializer<T, string>
  storage?: Storage
  onError?: (e: unknown) => void
}

function defaultOptions<T>(): Required<
  Omit<StoreItemOptions<T>, 'defaultValue'>
> {
  return {
    serializer: {
      encode: (value: T) => {
        return JSON.stringify(value)
      },
      decode: (value: string) => {
        return JSON.parse(value)
      },
    },
    storage: getStorage(),
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
  private options: Required<StoreItemOptions<T>>

  constructor(key: string, options: StoreItemOptions<T>) {
    this.key = key
    const d = defaultOptions<T>()
    this.options = {
      defaultValue: options.defaultValue,
      serializer: options.serializer || d.serializer,
      storage: options.storage || d.storage,
      onError: options.onError || d.onError,
    }
  }

  public get(defaultValue?: T): T {
    try {
      const v = this.options.storage?.getItem(this.key)
      if (v) {
        return this.options.serializer?.decode(v)
      }
    } catch (e) {
      this.options.onError(e)
    }
    return defaultValue ?? this.options.defaultValue
  }

  public set(value: Option<T>) {
    try {
      if (value === undefined) {
        this.options.storage.removeItem(this.key)
        return
      }
      this.options.storage.setItem(
        this.key,
        this.options.serializer.encode(value),
      )
    } catch (e) {
      this.options.onError(e)
    }
  }

  public clear() {
    try {
      this.options.storage.removeItem(this.key)
    } catch (e) {
      this.options.onError(e)
    }
  }
}
