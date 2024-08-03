import { SHA256, enc } from 'crypto-js'
import objectHashOuter from 'object-hash'

export const objectHash = (obj: {} | null) => {
  return SHA256(objectHashOuter(obj, { algorithm: 'passthrough' })).toString(
    enc.Hex,
  )
}

export { enc }

export const hash = (s: string, encoder?: typeof enc.Hex) => {
  return SHA256(s).toString(encoder)
}
