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

export interface FlexibleAction {
  key: String
}

export const createReducers = <State>(map: Map<string, any>, reducer: Function) => {
  const reducers = []

  for (const [key, value] of map) {
    reducers.push(factoryReducer(
      reducer,
      (state: State, action: Action<any>) => action.payload.key === key,
      value
    ))
  }

  return reduceReducers.apply(this, reducers)
}
