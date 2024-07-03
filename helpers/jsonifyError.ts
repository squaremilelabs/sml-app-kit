/* eslint-disable @typescript-eslint/no-explicit-any */

export default function jsonifyError<E extends Error>(error: E): any {
  function deepCopy(obj: any): any {
    if (obj === null || typeof obj !== "object") {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => deepCopy(item))
    }
    const copy: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key])
      }
    }
    return copy
  }

  const jsonError = deepCopy(error)
  for (const key of Object.getOwnPropertyNames(error)) {
    jsonError[key] = deepCopy((error as any)[key])
  }
  return jsonError
}
