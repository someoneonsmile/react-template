import { Marshaler, json } from './marshaler'

export interface StoreItemOptions<T> {
  defaultValue: T
  marshaler?: Marshaler<T>
  storage?: Storage
  onError?: (e: unknown) => void
}

function defaultOptions<T>(): Required<
  Omit<StoreItemOptions<T>, 'defaultValue'>
> {
  return {
    marshaler: json,
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
      marshaler: options.marshaler || d.marshaler,
      storage: options.storage || d.storage,
      onError: options.onError || d.onError,
    }
  }

  public get(defaultValue?: T): T {
    try {
      const v = this.options.storage?.getItem(this.key)
      if (v) {
        return this.options.marshaler?.unmarshal(v)
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
        this.options.marshaler.marshal(value),
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
