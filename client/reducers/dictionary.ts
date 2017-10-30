// generic parameters are used to define value types, not value itself
import { actionCreators as SublistActions } from './sublist'
import { Action, ActionCreator, actionCreator, Dispatch, getKey, memoize } from './util'
import { NAVIGATION, navigation } from '../data'
import { PROJECT, CONTACT, entry } from '../data/dictionary'

/* ========== ACTIONS ========== */
export interface DICTIONARY_ACTION {
  type: string,
  payload: any,
  key: string,
}

/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  fetchArticle: actionCreator<DICTIONARY_ACTION>('FETCH_ARTICLE'),
  fetchTag: actionCreator<DICTIONARY_ACTION>('FETCH_TAG')
}


/* ========== STATE ========== */
export interface State {
  [dictionaryKey: string]: Map<string, any>
}

export const initialState: State = {
  article: new Map(),
  tag: new Map(),
  project: PROJECT,
  contact: CONTACT,
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  const { payload, type } = action

  switch (type) {
  case actionCreators.fetchArticle.type:
    return {
      ...state,
      article: dictionaryReducer(state.article, payload),
    }

  case actionCreators.fetchTag.type:
    return {
      ...state,
      tag: dictionaryReducer(state.tag, payload)
    }

  default:
    return state
  }
}

export const dictionaryReducer = (state: Map<string, any>, action: DICTIONARY_ACTION): Map<string, any> => {
  const { key, payload, type } = action,
        next = new Map(state.entries())

  switch (type) {
  case 'SET':
    next.set(key, payload)

    return next

  case 'DELETE':
    next.delete(key)

  default:
    return state
  }
}

const createMapAction = (payload: any, key: string, type: string): DICTIONARY_ACTION => {
  const entry: entry = {data: payload, local: true, url: `/entry/${key}`}

  return {payload: entry, type, key}
}

const dictionaryActionCreator = (fetchMethod: any, key: string, type: string) =>
   fetchMethod instanceof Function ?
    fetchMethod().then((res: any) => dictionaryActionCreator(res.data || res, key, type)) :
    createMapAction(fetchMethod, key, type)

const dictionaryActionDispatch = (delayedAction: any, actionCreator: ActionCreator<any>) =>
  delayedAction instanceof Promise ?
    (dispatch: Dispatch) =>
      Promise.resolve(delayedAction)
        .then((action: DICTIONARY_ACTION) => dispatch(actionCreator(action)))
        .catch(console.error)
      :
    actionCreator(delayedAction)


const createDictionaryAction = (actionCreator: ActionCreator<any>) => ({
  set: (key: string, fetchMethod: Function | Object) => dictionaryActionDispatch(
    dictionaryActionCreator(fetchMethod, key, 'SET'),
    actionCreator
  ),
  delete: (key: string) => dictionaryActionDispatch(
    dictionaryActionCreator(null, key, 'DELETE'),
    actionCreator
  )
})

export const articleDictionary = createDictionaryAction(actionCreators.fetchArticle)
export const tagDictionary = createDictionaryAction(actionCreators.fetchTag)
