import { combineReducers } from 'redux'
import { NAVIGATION, navigationKeys, subList } from '../data'
import { reducer as fetch, State as FetchState } from './fetch'
import { reducer as main, State as MainState } from './main'
import { reducer as navigation, State as NavigationState } from './navigation'


export type RootState = {
  fetch: FetchState,
  main: MainState,
  navigation: NavigationState
}

export default combineReducers(
  {
    fetch,
    main,
    navigation
  }
)
