// generic parameters are used to define value types, not value itself
import { articleDictionary, tagDictionary } from './dictionary'
import { navigationSetup } from './navigation'
import { Action, actionCreator, Dispatch, callLeft, mapIterable, untilIterable } from './util'
import { fetchArticleRecent, fetchTags } from '../cms'
import { DICTIONARY, setDictionary } from '../data/dictionary'
import { KEYS } from '../data/key'

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
export const _fetchRecent = (dispatch: Dispatch) =>
  fetchArticleRecent()
    .then((res: any) => {
      const dispatchToArticle = (data: any) => dispatch(articleDictionary.set(data.id, data)),
            iterable = mapIterable(dispatchToArticle, res.data),
            call = Array.from(iterable)
    })
    .then(() => {
      dispatch(navigationSetup)
      dispatch(actionCreators.fetchComplete({fetched: true}))
    })
    .catch(console.error)

export const fetchTag = (dispatch: Dispatch) =>
  fetchTags()
    .then(res => {
      const dispatchToTag = (tag: any) => dispatch(tagDictionary.set(tag.tagName, tag)),
            iterable = mapIterable(dispatchToTag, res.data),
            call = Array.from(iterable)

    })

export const fetchRecent = (dispatch: Dispatch) =>
    Promise.all([fetchArticleRecent(), fetchTags()])
      .then((res: any) => {
        const articles = res[0].data,
              tags = res[1].data,
              dispatchToArticle = (data: any) => dispatch(articleDictionary.set(`${data.id}`, data)),
              dispatchToTag = (tag: any) => dispatch(tagDictionary.set(tag.tagName, tag)),
              iterableArticle = mapIterable(dispatchToArticle, articles),
              iterableTag = mapIterable(dispatchToTag, tags)

        Array.from(iterableArticle) && Array.from(iterableTag)
      })
      .then(() => {
        dispatch(navigationSetup)
        dispatch(actionCreators.fetchComplete({fetched: true}))
      })
      .catch(console.error)
