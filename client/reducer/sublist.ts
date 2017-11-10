import { actionCreator, Action, Dispatch } from 'Util/reducer'
import { navigation } from 'Data'

export interface SLIDE_HORIZONTAL {
  index: number,
  key: string
}

export interface APPEND_LIST {
  list: any[]
  key: string
}

export interface NEW_LIST {
  list: any[]
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
  subList: any[]
}

export const reducer = (state: State, action: Action<any>) => { // provided initialState during runtime
  const { payload, type } = action
  const { list } = payload
  const { subList } = state

  switch(type) {
  case actionCreators.slideHorizontal.type:
    const { index } = payload

    return {...state, activeIndex: index}

  case actionCreators.appendList.type:
    const next = nextList(subList, list)
    return {...state, subList: next}

  case actionCreators.newList.type:
    return {...state, subList: list}

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

const appendList = (max: number) => (arr: string[], value: string, i: number) =>
  i < max ? (arr.push(value), arr) : arr

const editList = (targetValue: string, targetIndex: number) => (arr: string[], value: string, i: number) =>
  (arr.push(targetIndex === i ? targetValue : value), arr)

function nextList (subList: string[], value: string, max: number = 5) {
  const index = subList.indexOf(value)

  return index > -1 ?
    subList.reduce(editList(value, index, max), []) :
    subList.reduce(appendList(max - 1), [value])
}
