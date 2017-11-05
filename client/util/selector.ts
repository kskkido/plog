import { identity, memoize } from './decorator'

export const combineSelector = (selector1: any, selector2: any, fn: Function) =>
  (state: any, ...rest: any[]) => fn(selector1(state, ...rest), selector2(state, ...rest))

export const mapSelector = (fn: Function) => (selector: Function) =>
  (state: any, ...rest: any[]) => selector(fn(state), ...rest)

export const memoizeState = (fn: Function) => {
  let memoized = memoize(fn),
      previous: any = undefined

  return function (state: any, ...rest: any[]) {
    if (previous !== state) {
      memoized = memoize(fn)
      previous = state
    }

    return memoized.apply(this, [state, ...rest])
  }
}
