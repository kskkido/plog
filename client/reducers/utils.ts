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

export type Dispatch = (action: Action<any>) => void

export const getKey: Error | any = (key: string, map: Map<any, any>) => {
  const property = map.get(key)

  if (typeof property === 'undefined') {
    throw Error ('Property ' + property + 'does not exist in' + map)
  } else {
    return property
  }
}
