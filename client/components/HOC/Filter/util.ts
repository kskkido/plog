interface obj {
  [property: string]: any
}

type mapFn = (value: any, index?: number, arr?: any[]) => any

export interface Query {
  tags: string[],
  title: string
}

const callLeft = (fn: Function, ...la: any[]) => function (...ra: any[]) { return fn.apply(this, [...la, ...ra]) }
const callRight = (fn: Function, ...ra: any[]) => function (...la: any[]) { return fn.apply(this, [...la, ...ra]) }
const compose = (...fns: Function[]) => fns.reduce((a: Function, b: Function) => (...args: any[]) => a(b(...args)))
const mapWith = (fn: mapFn) => (list: any[]) => list.map(fn)
const props = (property: string) => (obj: obj) => obj[property]

const getTagNames = mapWith(props('tagName'))
const getTags = compose(getTagNames, props('tags'), props('data'))
const getTitle = compose(props('title'), props('data'))

const matchTags = (queries: string[], tags: string[]) =>
  queries.length === 0 || queries.every((query: string) => tags.indexOf(query) > -1)
const matchTitle = (query: string, title: string) =>
  !query || title.match(new RegExp(query, 'i'))

const filterQuery = ({ tags, title }: Query) => (data: any) =>
  matchTitle(title, getTitle(data)) && matchTags(tags, getTags(data))

function* filterIterable (fn: Function, iterable: any[]) {
  for (const value of iterable) {
    if (fn(value)) { yield value }
  }
}

function* mapIterable (fn: Function, iterable: any[]) {
  for (const value of iterable) {
    yield fn(value)
  }
}

export const filterStream = (query: Query) => callLeft(filterIterable, filterQuery(query))
export const mapStream = (data: any[]) => callRight(mapIterable, data)
