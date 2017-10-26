import { actionCreator, Action, Dispatch, createInitialState, callLeft, reducerFromObject, reduceReducers, mapIterable } from './util'
import { selectRecentArticle } from './selector'
import { actionCreators as sublistActions, reducer as sublistReducer, State as SublistState } from './sublist'
import { fetchArticleRecent, fetchTags } from '../cms'
import { navigation, NAVIGATION } from '../data'

const sublistReducers = callLeft(mapIterable, reducerFromObject(sublistReducer))

export interface NAVIGATION_ACTION {
  key: string,
  index?: number,
  list?: any[]
}

export interface State {
  [key: string]: SublistState,
}

export const initialState = createInitialState(NAVIGATION)

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
  const articles = selectRecentArticle(state, 5)

  dispatch(sublistActions.newList({key: 'recent', list: articles}))
  dispatch(sublistActions.newList({key: 'article', list: articles}))
}
