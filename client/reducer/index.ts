import { combineReducers } from 'redux'
import { NAVIGATION, navigationKeys, subList } from 'Data'
import { reducer as dictionary, State as DictionaryState } from './dictionary'
import { reducer as fetch, State as FetchState } from './fetch'
import { reducer as main, State as MainState } from './main'
import { reducer as navigation, State as NavigationState } from './navigation'


export type RootState = {
  dictionary: DictionaryState,
  fetch: FetchState,
  main: MainState,
  navigation: NavigationState
}

export default combineReducers(
  {
    dictionary,
    fetch,
    main,
    navigation
  }
)
