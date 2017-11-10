import { combineReducers } from 'redux'
import { NAVIGATION, navigationKeys, subList } from 'Data'
import { reducer as dictionary, State as DictionaryState } from 'Reducer/dictionary'
import { reducer as fetch, State as FetchState } from 'Reducer/fetch'
import { reducer as main, State as MainState } from 'Reducer/main'
import { reducer as navigation, State as NavigationState } from 'Reducer/navigation'


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
