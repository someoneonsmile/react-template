// import { nanoid } from 'nanoid'
import { ulid } from 'ulid'

export function autoId() {
  return ulid()
}
