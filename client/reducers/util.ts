export type Action<A> = { // Action contains string type and payload
  type: string,
  payload?: A
}

export interface ActionCreator<A> { // function that returns
  type: string,
  (payload?: A): Action<A>
}

export const actionCreator = <A = {}>(type: string): ActionCreator<A> =>
  Object.assign((payload: A): Action<A> => ({type, payload}), {type})
// so payload as argument must match P

export type Dispatch = (action: Action<any> | Function) => void

export const getKey: Error | any = (key: string, map: Map<any, any>) => {
  const property = map.get(key)

  if (typeof property === 'undefined') {
    throw Error ('Property ' + property + 'does not exist in' + map)
  } else {
    return property
  }
}

export const callLeft = (fn: Function, ...la: any[]) =>
  function (...ra: any[]) {
    return fn.apply(this, [...la, ...ra])
  }

export const tap = (fn: Function, arg: any) => {
  const curried = (_arg: any) => (fn(_arg), _arg)

  return typeof arg === undefined ?
    curried :
    curried(arg)
}

export const factoryReducer = (reducerFn: Function, condition: Function, initialState: any) =>
  (state: any = initialState, action: Action<any>) => {
    const initialRun = action.payload === undefined
    const shouldSkip = initialRun || !condition(state, action)

    return shouldSkip ? state : reducerFn(state, action)
  }

export const memoize = (fn: Function) => {
  const cache = new Map()

  return function (...args: any[]) {
    return cache.has(args) ?
      cache.get(args) :
      cache.set(args, fn(...args)) && cache.get(args)
  }
}

export const reduceReducers = (...reducers: Function[]) => (state: any, action: Action<any>) =>
  reducers.reduce((acc, reducer) => reducer(acc, action), state)

export interface FlexibleState {
  [key: string]: any
}

export const createInitialState = (map: Map<string, any>): FlexibleState => {
  const state: FlexibleState = {}

  for (const [key, value] of map) {
    state[key] = value
  }

  return state
}

export interface keyValue {
  key: String,

}

export const reducerFromObject = (reducer: Function) => ([key, initialState]: any[]) =>
  factoryReducer(reducer, (state: any, action: Action<any>) => action.payload.key === key, initialState)

export function* mapIterable (fn: Function, iterable: any) {
  for (const value of iterable) {
    yield fn(value)
  }
}

export function* untilIterable (n: number, iterable: any) {
  let count = n

  for (const value of iterable) {
    if (count-- <= 0) {
      break
    }

    yield value
  }
}
