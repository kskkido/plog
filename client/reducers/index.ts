import { combineReducers } from 'redux'
import { NAVIGATION, navigationKeys, subList } from '../data'
import { reducer as fetch, State as FetchState } from './fetch'
import { reducer as main, State as MainState } from './main'
import { reducer as sublist, State as SublistState, createSublistReducers } from './sublist'


export type RootState = {
  fetch: FetchState,
  main: MainState,
  RECENT: SublistState,
  ARTICLE: SublistState,
  CONTACT: SublistState,
  PROJECT: SublistState
}

export default combineReducers(Object.assign(
  {
    fetch,
    main
  },
  createSublistReducers(NAVIGATION)
))
