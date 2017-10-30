import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'

export type dataObject = { [property: string]: any }

const log = (arg: any) => (console.log(arg), arg)
const compose = (...fns: Function[]) => fns.reduce((a: Function, b: Function) => (...args: any[]) => a(b(...args)))
const identity = (i: any) => i
const invoke = (property: string) => (obj: dataObject) => obj[property]()
const getMaybe = (getFn: Function) => (arg: any) => getFn(arg) === undefined ? arg : getFn(arg)
const getProps = (property: string) => (obj: dataObject) => obj[property]
const setFromIter = (arr: any[]) => new Set(arr || [])
const mapIter = (fn: Function) => function* (iterable: any[]) {
  for(const value of iterable) {
    yield fn(value)
  }
}

const createConvert = (getFn: Function) => (fn: Function) => compose(fn, getMaybe(getFn))


const mapContent = createConvert(getProps('content'))
const mapStatus = createConvert(getProps('status'))
const mapTitle = createConvert(getProps('title'))
const mapTags = createConvert(getProps('tags'))

export const toApi = {
  content: mapContent(stateFromHTML),
  status: mapStatus(identity),
  tags: mapTags(compose(setFromIter, mapIter(getMaybe(getProps('tagName'))))),
  title: mapTitle(identity) || 'untitled article',
}

export const fromApi = {
  content: mapContent(compose(stateToHTML, invoke('getCurrentContent'))),
  status: toApi.status,
  tags: mapTags(Array.from),
  title: toApi.title,
}

export const toState = (article: any) => ({
  ready: true,
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
