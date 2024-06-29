export default function convertEmptyStringsToNulls(obj: object) {
  return Object.entries(obj).reduce((final, [key, value]) => {
    const finalValue = typeof value === "string" && !value ? null : value
    return { ...final, [key]: finalValue }
  }, {})
}
