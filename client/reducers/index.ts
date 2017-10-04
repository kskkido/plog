import { combineReducers } from 'redux'
import { reducer as fetch, State as FetchState } from './fetch'

export type RootState = {
  fetch: FetchState
}

export default combineReducers({
  fetch
})
