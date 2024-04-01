// https://stackoverflow.com/questions/50374869/generic-way-to-convert-all-instances-of-null-to-undefined-in-typescript
export function nullsToUndefined<T>(
  obj: T
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    return undefined as any
  }

  // object check based on: https://stackoverflow.com/a/51458052/6489012
  if ((obj as any).constructor.name === 'Object' || Array.isArray(obj)) {
    for (const key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any
    }
  }
  return obj as any
}
