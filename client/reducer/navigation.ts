import { navigation, NAVIGATION } from 'Data'
import { strMapToObj } from 'Util/converter'
import { callLeft } from 'Util/decorator'
import { mapIterable } from 'Util/generator'
import { actionCreator, Action, Dispatch, reducerFromObject, reduceReducers } from 'Util/reducer'
import { selectRecentArticle } from './selector'
import { actionCreators as sublistActions, reducer as sublistReducer, State as SublistState } from './sublist'

const sublistReducers = callLeft(mapIterable, reducerFromObject(sublistReducer))

export interface NAVIGATION_ACTION {
  key: string,
  index?: number,
  list?: any[]
}

export interface State {
  [key: string]: SublistState,
}

export const initialState = strMapToObj(NAVIGATION)

export const SublistReducers =  reduceReducers.apply(this, Array.from(sublistReducers(NAVIGATION)))

export const reducer = (state: State = initialState, action: Action<any>) => {
  const { payload, type } = action

  switch(type) {
  case 'SLIDE_HORIZONTAL':
  case 'APPEND_LIST':
  case 'NEW_LIST':
    const { key } = payload

    return {...state, [key]: SublistReducers(state[key], action)}

  default:
    return state
  }
}

export const navigationSetup = (dispatch: Dispatch, getState: Function) => {
  const state = getState()
  const articles = Array.from(selectRecentArticle(state, 5).keys())

  dispatch(sublistActions.newList({key: 'recent', list: articles}))
  dispatch(sublistActions.newList({key: 'article', list: articles}))
}
