export default function getSearchParamsFromObject<
  T extends Record<string, string | number | boolean | null | undefined>,
>(object: T, options?: { keepNull?: boolean; keepUndefined?: boolean }): URLSearchParams {
  const newObject = Object.entries(object).reduce((prev, entry) => {
    const [key, value] = entry
    // removes null & undefineds by default, unless options are passed to keep them
    if (!options?.keepNull && value === null) return prev
    if (!options?.keepUndefined && typeof value === "undefined") return prev
    // ---
    return { ...prev, [key]: value }
  }, {})
  const searchParams = new URLSearchParams(newObject)
  return searchParams
}
