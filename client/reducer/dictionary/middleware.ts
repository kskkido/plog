import { selectTag } from 'Reducer/selector'
import { fetchTag } from 'Util/server'
import { DICTIONARY_ACTION } from './'

// GETTER
const getData = (action: DICTIONARY_ACTION) => action.payload.data
const getStatus = (action: DICTIONARY_ACTION) => getData(action).status
const getType = (action: DICTIONARY_ACTION) => action.type

// MIDDLEWARE
export const dispatchAppendMiddleware = (actionCreator: Function) => (dispatch: Dispatch, getState: Function) => (action: DICTIONARY_ACTION) => {
  if (!getStatus(action) || getType(action) !== 'SET') { return action }

  const article = getData(action)

  dispatch(actionCreator({key: 'recent', list: article.id}))
  return action
}

export const dispatchTagMiddleware = (actionCreator: Function) => (dispatch: Dispatch, getState: Function) => (action: DICTIONARY_ACTION) => {
  if (getType(action) !== 'SET') { return action }

  const tagState = selectTag(getState())
  const { data } = action.payload
  const { tags } = data

  tags.length > 0 && tags.forEach(
    (tag: any) => dispatch(actionCreator(tag)))
  return action
}

export const previewMiddleware = (dispatch: Dispatch, getState: Function) => (action: DICTIONARY_ACTION) => {
  if (getType(action) !== 'SET') return { action }
  const { data } = action.payload

  data.preview = data.content.getPlainText().slice(0, 150)
  return Object.assign({}, action)
}
