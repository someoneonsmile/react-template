import { parse, stringify } from 'devalue'

export interface Marshaler<T> {
  marshal: (v: T) => string
  unmarshal: (v: string) => T
}

export const devalue: Marshaler<any> = {
  marshal: stringify,
  unmarshal: parse,
}

// 自定义序列化函数
function replacer(this: any, key: string, value: any) {
  if (this[key] instanceof Date) {
    return { __type__: 'Date', __value__: this[key].toISOString() }
  }
  return value
}

// 自定义反序列化函数
function reviver(_key: string, value: any) {
  if (
    value &&
    typeof value === 'object' &&
    value.__type__ === 'Date' &&
    value.__value__
  ) {
    return new Date(value.__value__)
  }
  return value
}

export const json: Marshaler<any> = {
  marshal: (v: any) => {
    return globalThis.JSON.stringify(v, replacer)
  },
  unmarshal: (v: string) => {
    return globalThis.JSON.parse(v, reviver)
  },
}
