import { actionCreator, Action, Dispatch, factoryReducer, provideInitialState } from './util'
import { navigation } from '../data'

export interface SLIDE_HORIZONTAL {
  index: number,
  key: string
}

export interface APPEND_LIST {
  list: string[]
  key: string
}

export interface NEW_LIST {
  list: string[]
  key: string
}

/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  slideHorizontal: actionCreator<SLIDE_HORIZONTAL>('SLIDE_HORIZONTAL'),
  appendList: actionCreator<APPEND_LIST>('APPEND_LIST'),
  newList: actionCreator<NEW_LIST>('NEW_LIST')
}


export interface State {
  activeIndex: number,
  subList: string[]
}

export const reducer = (state: State, action: Action<any>) => { // provided initialState during runtime
  switch(action.type) {
  case actionCreators.slideHorizontal.type:
    const { index } = action.payload

    return {...state, activeIndex: index}

  case actionCreators.appendList.type:
    const { subList } = state

    return {...state, subList: subList.concat(action.payload.list)}

  case actionCreators.newList.type:
    return {...state, subList: action.payload.list}

  default:
    return state
  }
}

export const slideHorizontal = (index: number) => (dispatch: Dispatch, getState: Function) =>
  dispatch(actionCreators.slideHorizontal({index, key: getState().main.key}))

export interface reducers {
  [key: string]: Function
}

export const createSublistReducers = (navigation: navigation) => {
  const reducers: reducers = {}

  for (const [key, initialState] of navigation) {
    reducers[key] = provideInitialState<State>(
      initialState,
      factoryReducer(reducer, (state: any, action: Action<any>) => action.payload.key === key)
    )
  }
  console.log(reducers, 'REDUCERS')
  return reducers
}

