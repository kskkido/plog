import { memoizeState, getProps, mapSelector } from './util'
import { callLeft, mapIterable, untilIterable } from '../util'
import { State } from '../dictionary'

const getDictionary = getProps('dictionary')
const mapGetDictionary = mapSelector(getDictionary)
const memoizeDictionary = (fn: Function) => mapGetDictionary(memoizeState(fn))

const filterByKey = (dictionary: State, dictionaryKey: string, key: string) =>
  dictionary[dictionaryKey].get(key)

function* filterIterator (dictionary: State, dictionaryKey: string, keys: string[]) { //make it declarative?
  const curriedFilter = callLeft(filterByKey, dictionary, dictionaryKey)

  yield *mapIterable(curriedFilter, keys)
}

export const getByKey = memoizeDictionary(filterByKey)
export const getByKeys = memoizeDictionary(filterIterator)
export const getArticle= memoizeDictionary((dictionary: State) => dictionary.article)
export const getTag = memoizeDictionary((dictionary: State) => dictionary.tag)
export const getVisibleArticle = memoizeDictionary((dictionary: State) =>
  Array.from(dictionary.article.entries()).reduce((arr, [key, article]) =>
    article.status ?
    (arr.push(article), arr) :
    arr
  ))
export const getRecentArticle = memoizeDictionary((dictionary: State, length: number, getter?: Function) => {
const res = []

for (const [key, article] of untilIterable(length, dictionary.article)) {
  res.push(getter ? getter(article, key) : key)
}

return res
})
