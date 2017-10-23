// generic parameters are used to define value types, not value itself
import { Action, actionCreator, Dispatch, tap } from './util'
import { fetchArticleRecent, fetchTags } from '../cms'
import { DICTIONARY, setDictionary } from '../data/dictionary'
import { KEYS } from '../data/key'
import { NavigationStore } from '../data/store'

/* ========== ACTIONS ========== */
export const FETCH_COMPLETE = 'FETCH_COMPLETE'
export interface FETCH_COMPLETE_PAYLOAD {
  fetched: boolean
}


/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  fetchComplete: actionCreator<FETCH_COMPLETE_PAYLOAD>(FETCH_COMPLETE) // CALLED AFTER PRELOAD COMPLETES FETCHING FROM DATABASE
}

/* ========== STATE ========== */
export interface State {
  fetched: boolean
}

const initialState: State = {
  fetched: false
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
  case actionCreators.fetchComplete.type:
    return {...state, fetched: action.payload.fetched}

  default:
    return state
  }
}

/* ========== DISPATCHER ========== */
export const fetchRecent = (dispatch: Dispatch, getState: Function) =>
  fetchArticleRecent(5)
    .then(res => {
      const key = KEYS.RECENT, // change this later on
            sublist = res.data.map((data: any) => tap(setDictionary(key), data).title.toUpperCase())

      NavigationStore.setSublist(key, sublist)
    })
    .then(() => dispatch(actionCreators.fetchComplete({fetched: true})))
    .catch(console.error)

export const fetchTag = (dispatch: Dispatch) =>
  fetchTags()
    .then(res => {
      res.data.map((data: any) => setDictionary(KEYS.TAG))
    })
