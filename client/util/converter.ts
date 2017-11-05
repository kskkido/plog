export const arrToObj = (arr: any[]) => arr.reduce((hash, el, i) => (hash[el] = i, hash), {})
export const arrToSet = (arr: any[]) => new Set(arr || [])

export const iterToArr = (iterable: ArrayLike<any>) => Array.from(iterable)

export const strMapToObj = (map: Map<string, any>) => {
  const obj = {}

  for (const [key, value] of map) {
    obj[key] = value
  }

  return obj
}
export const strToTitle = (str: string) => str.replace(/_/, ' ')
export const strToUrl = (str: string) => str.replace(/\s/g, '_')
