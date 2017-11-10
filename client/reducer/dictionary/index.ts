// generic parameters are used to define value types, not value itself
import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { NAVIGATION, navigation } from 'Data'
import { PROJECT, CONTACT, entry } from 'Data/dictionary'
import { callLeft, compose, filterBy, identity, memoize } from 'Util/decorator'
import { getKey } from 'Util/getter'
import { actionCreator, Action, ActionCreator, Dispatch } from 'Util/reducer'
import { fetchTag } from 'Util/server'
import { selectTag } from 'Reducer/selector'
import { actionCreators as subListActions } from 'Reducer/sublist'
import DictionaryDispatch from './dispatch'
import { dispatchAppendMiddleware, dispatchTagMiddleware, previewMiddleware } from './middleware'

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

export const tagDictionary = new DictionaryDispatch(actionCreators.fetchTag)
tagDictionary.set = callLeft(tagDictionary.set, (data: any) => data.tagName)

export const articleDictionary = new DictionaryDispatch(
  actionCreators.fetchArticle,
  [
    previewMiddleware,
    dispatchTagMiddleware(tagDictionary.set),
    dispatchAppendMiddleware(subListActions.appendList)
  ]
)
articleDictionary.set = callLeft(articleDictionary.set, (data: any) => data.id)

