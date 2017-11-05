// generic parameters are used to define value types, not value itself
import { DICTIONARY, setDictionary } from 'Data/dictionary'
import { KEYS } from 'Data/key'
import { callLeft } from 'Util/decorator'
import { mapIterable, untilIterable } from 'Util/generator'
import { actionCreator, Action, Dispatch } from 'Util/reducer'
import { fetchArticles, fetchTags } from 'Util/server'
import { selectDictionary } from 'Util/selector'
import { articleDictionary, tagDictionary } from './dictionary'
import { navigationSetup } from './navigation'

/* ========== ACTIONS ========== */
export interface FETCH_ERROR {
  error: any
}

export interface FETCH_COMPLETE_PAYLOAD {
}


/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  fetchComplete: actionCreator<FETCH_COMPLETE_PAYLOAD>('FETCH_COMPLETE') // CALLED AFTER PRELOAD COMPLETES FETCHING FROM DATABASE
  fetchError: actionCreator<FETCH_ERROR>('FETCH_ERROR')
}

/* ========== STATE ========== */
export interface State {
  fetched: boolean,
  error: any
}

const initialState: State = {
  fetched: false,
  error: undefined
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  const { payload, type } = action

  switch (type) {
  case actionCreators.fetchComplete.type:
    return {...state, fetched: true}

  case actionCreators.fetchError:
    return {...state, error: payload.error}

  default:
    return state
  }
}

/* ========== DISPATCHER ========== */

export const fetchTimeline = (fetchMethod: Function) => (dispatch: Dispatch, getState: Function) => {
  dispatch(fetchStart())
}

export const beforeFetch = (fetchMethod: Function, type: string) => (key: string, ...rest: any[]) => (dispatch: Dispatch, getState: Function) => {
  const dictionary = selectDictionary(getState())
  const section = dictionary[type]

  return section.has(key) ?
    Promise.resolve() :
    dispatch(fetchMethod(key, ...rest))
}

export const fetchInitial = (dispatch: Dispatch) =>
    Promise.all([fetchArticles(), fetchTags()])
      .then((res: any) => {
        const articles = res[0].data
        const tags = res[1].data

        articles.forEach((data: any) => dispatch(articleDictionary.set(data)))
        tags.forEach((data: any) => dispatch(tagDictionary.set(data)))
      })
      .then(() => {
        dispatch(navigationSetup)
        dispatch(actionCreators.fetchComplete({fetched: true}))
      })
      .catch(dispatch(actionCreators.fetchError))
