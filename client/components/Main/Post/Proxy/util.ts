import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { arrToSet } from 'Util/converter'
import { callLeft, compose, identity, invoke } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { mapIterable } from 'Util/generator'

export type dataObject = { [property: string]: any }

const getMaybe = (property: string) => (obj: dataObject) => {
  const value = getProps(property)(obj)

  return value === undefined ? obj : value
}
const createConvert = (property: string) => (fn: Function) => compose(fn, getMaybe(property))
const curriedMap = (fn: Function) => callLeft(mapIterable, fn)

const mapContent = createConvert('content')
const mapStatus = createConvert('status')
const mapTitle = createConvert('title')
const mapTags = createConvert('tags')

export const toApi = {
  content: mapContent(identity),
  status: mapStatus(identity),
  tags: mapTags(compose(arrToSet, curriedMap(getMaybe('tagName')))),
  title: mapTitle(identity) || 'untitled article',
}

export const fromApi = {
  content: mapContent(compose(JSON.stringify, convertToRaw, invoke('getCurrentContent'))),
  status: toApi.status,
  tags: mapTags(Array.from),
  title: toApi.title,
}

export const toState = (article: any) => ({
  content: toApi.content(article),
  status: toApi.status(article),
  tags: toApi.tags(article),
  title: toApi.title(article) || 'untitled'
})

export const fromState = (state: any) => ({
  content: fromApi.content(state),
  status: fromApi.status(state),
  tags: fromApi.tags(state),
  title: fromApi.title(state) || 'untitled',
})

/* ENTRY STATE:
  title, -> title
  tags, -> Set
  content -> editorState
*/

/* EDITOR STATE:
  title,
  tags,
  editorState,
*/
