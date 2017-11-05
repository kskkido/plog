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

export const reduceReducers = (...reducers: Function[]) => (state: any, action: Action<any>) =>
  reducers.reduce((acc, reducer) => reducer(acc, action), state)

export const factoryReducer = (reducerFn: Function, condition: Function, initialState: any) =>
  (state: any = initialState, action: Action<any>) => {
    const initialRun = action.payload === undefined
    const shouldSkip = initialRun || !condition(state, action)

    return shouldSkip ? state : reducerFn(state, action)
  }

export const reducerFromObject = (reducer: Function) => ([key, initialState]: any[]) =>
  factoryReducer(reducer, (state: any, action: Action<any>) => action.payload.key === key, initialState)
