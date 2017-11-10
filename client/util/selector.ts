import { identity } from './decorator'

const memoizeRest = (fn: Function) => {
  const cache = new Map()
  const stringify = JSON.stringify

  return function (state, ...rest) {
    const key = stringify(rest)

    return cache.has(rest) ?
      cache.get(rest) :
      (cache.set(key, fn.apply(this, [state, ...rest])), cache.get(key))
  }
}

export const combineSelector = (selector1: any, selector2: any, fn: Function) =>
  (state: any, ...rest: any[]) => fn(selector1(state, ...rest), selector2(state, ...rest))

export const mapSelector = (fn: Function) => (selector: Function) =>
  (state: any, ...rest: any[]) => selector(fn(state), ...rest)

export const memoizeState = (fn: Function) => {
  let memoized,
      previous

  return function (state: any, ...rest: any[]) {
    if (previous !== state) {
      memoized = memoizeRest(fn)
      previous = state
    }

    return memoized.apply(this, [state, ...rest])
  }
}
