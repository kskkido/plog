//ARRAY
export const arrToObj = (arr: any[]) => arr.reduce((hash, el, i) => (hash[el] = i, hash), {})
export const arrToSet = (arr: any[]) => new Set(arr || [])

//ITERABLE
export const iterToArr = (iterable: ArrayLike<any>) => Array.from(iterable)

//STRING
export const strMapToObj = (map: Map<string, any>) => {
  const obj = {}

  for (const [key, value] of map) {
    obj[key] = value
  }

  return obj
}
export const strToTitle = (str: string) => str.replace(/_/, ' ')
export const strToUrl = (str: string) => str.replace(/\s/g, '_')

//OBJECT
export const mapValue = (obj: object, fn: Function) => {
  const hasOwn = Object.prototype.hasOwnProperty.bind(obj)
  const res = {}

  for (let property in obj) if (hasOwn(property)) {
    res[property] = fn(obj[property], property)
  }

  return res
}
