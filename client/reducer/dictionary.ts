// generic parameters are used to define value types, not value itself
import { NAVIGATION, navigation } from 'Data'
import { PROJECT, CONTACT, entry } from 'Data/dictionary'
import { callLeft, memoize } from 'Util/decorator'
import { getKey } from 'Util/getter'
import { actionCreator, Action, ActionCreator, Dispatch } from 'Util/reducer'
import { actionCreators as SublistActions } from './sublist'

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
  const { payload, type, key } = action
  const next = new Map(state.entries())

  switch (type) {
  case 'SET':
    next.set(key, payload)
    return next

  case 'DELETE':
    next.delete(key)
    return next

  default:
    return state
  }
}


const createMapAction = (payload: any, _key: string, type: string): DICTIONARY_ACTION => {
  const key = _key instanceof Function ? _key(payload) : _key
  const entry: entry = {data: payload, local: true, url: `/entry/${key}`}

  return { payload: entry, type, key }
}

const dictionaryActionCreator = (fetchMethod: any, key: string, type: string) =>
  fetchMethod instanceof Function ?
    dictionaryActionCreator(fetchMethod(), key: string, type) :
    createMapAction(fetchMethod, key, type)

const createDictionaryAction = (actionCreator: ActionCreator<any>) => {
  return {
    set: (key: Function | string, fetchMethod: Function | Object) =>
      fetchMethod instanceof Promise ?
        (dispatch: Dispatch) =>
          fetchMethod
            .then((res: any) => dispatch(
              actionCreator(dictionaryActionCreator(res.data, key, 'SET'))
            )) :
        actionCreator(dictionaryActionCreator(fetchMethod, key, 'SET')),
    delete: (key: string) =>
      actionCreator(dictionaryActionCreator(null, key, 'DELETE'))
  }
}

export const articleDictionary = createDictionaryAction(actionCreators.fetchArticle)
export const tagDictionary = createDictionaryAction(actionCreators.fetchTag)

articleDictionary.set = callLeft(articleDictionary.set, (data: any) => '' + data.id)
tagDictionary.set = callLeft(tagDictionary.set, (data: any) => data.tagName)
