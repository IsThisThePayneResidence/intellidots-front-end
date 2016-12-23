export function getValue(item, key = null, allowUndefined = false) {
  let value = ("object" === typeof item)
    ? _.at(item, key)[0]
    : item
  if (__DEV__ && !allowUndefined && ((value === undefined) || ("object" === typeof value))) {
    console.warn('incorrect value type. value, item, key', value, item, key)
  }
  return value
}