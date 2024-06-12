export default function getObjectFromSearchParams<
  T extends Record<string, string | number | boolean> = Record<string, string | number | boolean>,
>(searchParams: URLSearchParams, options?: { keepValuesAsStrings?: boolean }): T {
  const result: Record<string, string | number | boolean> = {}
  searchParams.forEach((value, key) => {
    let finalValue: string | number | boolean = value
    // convert to numbers / booleans
    if (!options?.keepValuesAsStrings) {
      // convert to number
      if (!Number.isNaN(value)) {
        finalValue = +value
      }
      // convert to boolean
      if (value === "true" || value === "false") {
        finalValue = Boolean(value === "true")
      }
    }
    result[key] = finalValue
  })
  return result as T
}
