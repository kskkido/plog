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

export const factoryReducer = (reducerFn: Function, condition: Function) =>
  (state: any, action: Action<any>) => {
    const initialRun = action.payload === undefined
    const shouldSkip = initialRun || !condition(state, action)

    return shouldSkip ? state : reducerFn(state, action)
  }

export const provideInitialState = <T>(initialState: T, reducer: Function) =>
  function (state: T, action: Action<any>) {
    return state === undefined ? reducer(initialState, action) : reducer(state, action)
  }
