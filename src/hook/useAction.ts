import { useState } from 'react'

export default function () {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<any>(null)
  const action = function (fn: Function) {
    setLoading(true)
    setErr(null)
    try {
      const r = fn()
      if (r instanceof Promise) {
        r.then((v) => {
          setLoading(false)
          return v
        }).catch((e) => {
          setErr(e)
          throw e
        })
      } else {
        setLoading(false)
      }
      return r
    } catch (e) {
      setErr(e)
      setLoading(false)
      return
    }
  }
  return [action, loading, err]
}
