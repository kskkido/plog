import { actionCreator, Action, Dispatch } from './util'
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
  const { payload, type } = action

  switch(type) {
  case actionCreators.slideHorizontal.type:
    const { index } = payload

    return {...state, activeIndex: index}

  case actionCreators.appendList.type:
    const { subList } = state

    return {...state, subList: subList.concat(payload.list)}

  case actionCreators.newList.type:
    return {...state, subList: payload.list}

  default:
    return state
  }
}

export const slideHorizontal = (index: number) => (dispatch: Dispatch, getState: Function) => {
  const state = getState(),
        { key } = state.main

  dispatch(actionCreators.slideHorizontal({index, key}))
}

export interface reducers {
  [key: string]: Function
}
