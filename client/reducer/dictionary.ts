// generic parameters are used to define value types, not value itself
import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { NAVIGATION, navigation } from 'Data'
import { PROJECT, CONTACT, entry } from 'Data/dictionary'
import { callLeft, compose, identity, memoize } from 'Util/decorator'
import { getKey } from 'Util/getter'
import { actionCreator, Action, ActionCreator, Dispatch } from 'Util/reducer'
import { fetchTag } from 'Util/server'
import { selectTag } from 'Reducer/selector'
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

class DictionaryActions {
  constructor(actionCreator: Function, middlewares: Function[] = []) {

    this.create = (action) => (dispatch: Dispatch, getState: Function) => {
      let middleware = identity

      if (middlewares.length > 0) {
        const curried = middlewares.map((fn: Function) => fn(dispatch, getState))
        middleware = compose(...curried)
      }

      return action instanceof Promise ?
        action.then((res: DICTIONARY_ACTION) => dispatch(actionCreator(middleware(res)))) :
        dispatch(actionCreator(middleware(action)))
    }
  }

  static createMapAction = (payload: any, _key: string, type: string): DICTIONARY_ACTION => {
    const key = _key instanceof Function ? _key(payload) : _key
    const entry: entry = {data: payload, local: true, url: `/entry/${key}`}

    return { payload: entry, type, key }
  }

  static dictionaryActionCreator = (fetchMethod: any, key: string, type: string) =>
    fetchMethod instanceof Promise ?
      fetchMethod.then((res: any) => DictionaryActions.createMapAction(res.data, key, type)) :
      DictionaryActions.createMapAction(fetchMethod, key, type)

  set = (key: Function | String, fetchMethod: Function | Object) =>
    this.create(DictionaryActions.dictionaryActionCreator(fetchMethod, key, 'SET'))

  delete = (key: String) =>
    this.create(DictionaryActions.dictionaryActionCreator(null, key, 'DELETE'))
}

export const articleDictionary = new DictionaryActions(actionCreators.fetchArticle, [previewMiddleware, tagMiddleware])
export const tagDictionary = new DictionaryActions(actionCreators.fetchTag)

articleDictionary.set = callLeft(articleDictionary.set, (data: any) => '' + data.id)
tagDictionary.set = callLeft(tagDictionary.set, (data: any) => data.tagName)

function previewMiddleware () {
  return (action: DICTIONARY_ACTION) => {
    if (action.type !== 'SET') { return action }

    const { data } = action.payload

    data.preview = data.content.getPlainText().slice(0, 150)
    return Object.assign({}, action)
  }
}

function tagMiddleware (dispatch: Dispatch, getState: Function) {
  return (action: DICTIONARY_ACTION) => {
    if (action.type !== 'SET') { return action }

    const tagState = selectTag(getState())
    const { data } = action.payload
    const { tags } = data

    tags.length > 0 && tags.forEach(
      ({ tagName }: any) => dispatch(tagDictionary.set(fetchTag(tagName))))
    return action
  }
}

function appendMiddleware (dispatch: Dispatch, getState: Function) {
  return (action: DICTIONARY_ACTION) => {
    if (action.type !== 'SET') { return action }

  }
}
