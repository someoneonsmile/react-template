import { APP_NAME } from '../config'

function nativeNotify(params: any) {}

export const errorHandler = <F extends (...args: any[]) => any>(f: F) => {
  type returnType = ReturnType<typeof f> | void
  return function (...args: Parameters<typeof f>): returnType {
    try {
      return f(...args)
    } catch (e: any) {
      nativeNotify({ title: APP_NAME, body: e.message })
    }
  }
}

export const asyncErrorHandler = <F extends (...args: any[]) => Promise<any>>(
  f: F
) => {
  type returnType = Awaited<ReturnType<typeof f>> | void
  return async function (...args: Parameters<typeof f>): Promise<returnType> {
    try {
      return await f(...args)
    } catch (e: any) {
      console.log(e)
      await nativeNotify({
        title: APP_NAME,
        body: typeof e === 'string' ? e : e.message,
      })
    }
  }
}
