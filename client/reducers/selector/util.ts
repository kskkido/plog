import { memoize } from '../util'

export const identity = (i: any) => i

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

export const getProps = (property: string) => (state: any) => {
  return state[property]
}

export const mapSelector = (fn: Function) => (selector: Function) => (state: any, ...rest: any[]) => selector(fn(state), ...rest)

export const combineSelector = (selector1: any, selector2: any, fn: Function) => (state: any, ...rest: any[]) => fn(selector1(state), selector2(state), ...rest)
