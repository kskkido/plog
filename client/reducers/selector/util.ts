import { memoize } from '../util'

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
