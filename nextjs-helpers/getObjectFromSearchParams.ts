type Value = string | number | boolean | null | undefined

export default function getObjectFromSearchParams<
  T extends Record<string, Value> = Record<string, Value>,
>(searchParams: URLSearchParams, options?: { keepValuesAsStrings?: boolean }): T {
  const result: Record<string, Value> = {}
  searchParams.forEach((value, key) => {
    let finalValue: Value = value
    // convert strings
    if (!options?.keepValuesAsStrings) {
      // convert to number
      if (!Number.isNaN(value)) {
        finalValue = +value
      }
      // convert to boolean
      if (value === "true" || value === "false") {
        finalValue = Boolean(value === "true")
      }
      // convert to null
      if (value === "null") {
        finalValue = null
      }
      // convert to undefined
      if (value === "undefined") {
        finalValue = undefined
      }
    }
    result[key] = finalValue
  })
  return result as T
}
