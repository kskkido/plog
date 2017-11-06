export const callLeft = (fn: Function, ...la: any[]) =>
  function (...ra: any[]) {
    return fn.apply(this, [...la, ...ra])
  }

export const callRight = (fn: Function, ...ra: any[]) =>
  function (...la: any[]) {
    return fn.apply(this, [...la, ...ra])
  }

export const compose = (...fns: Function[]) =>
  fns.reduce((a: Function = identity, b = identity: Function) => (...args: any[]) => a(b(...args)))

export const createTree = (left: Function, right: Function) =>
  (condition: boolean) => condition ? right() : left()

export const identity = (i: any) => i

export const invoke = (property: string) => (obj: dataObject) => obj[property]()

export const mapWith = (fn: mapFn) => (list: any[]) => list.map(fn)

export const maybeFn = (fn: any, option: object = {}): Function =>
  (...args: any[]) => typeof fn === 'function' ?
    fn(...args) :
      Object.assign(maybeFn(identity), option)

export const memoize = (fn: Function) => {
  const cache = new Map()

  return function (...args: any[]) {
    return cache.has(args) ?
      cache.get(args) :
      cache.set(args, fn(...args)) && cache.get(args)
  }
}

export const log = (fn: Function, string?: string) =>
  function (...args: any[]) {
    console.log('LOG', fn, args)
    string && console.log(string)

    return fn.apply(this, args)
  }

export const tap = (fn: Function, arg: any) => {
  const curried = (_arg: any) => (fn(_arg), _arg)

  return typeof arg === undefined ?
    curried :
    curried(arg)
}

export const unary = (fn: Function) =>
  function (arg?: any) {
    return fn.call(this, arg)
  }

export const withIndex = (fn: Function) => {
  let index = 0

  return function (arg: any) {
    return fn.call(this, arg, index++)
  }
}
