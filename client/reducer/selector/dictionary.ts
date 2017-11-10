import { createSelector } from 'reselect'
import { callLeft, compose, identity, log, unary } from 'Util/decorator'
import { filterIterable, mapIterable, untilIterable } from 'Util/generator'
import { getProps } from 'Util/getter'
import { combineSelector, memoizeState, mapSelector } from 'Util/selector'
import { State } from '../dictionary'

type Articles = article
type Tags = Map<string, any>

export const mapGetDictionary = mapSelector(getProps('dictionary'))
const mapGetArticle = mapSelector(getProps('article'))
const mapGetTag = mapSelector(getProps('tag'))
const memoizeDictionary = (fn: Function) => mapGetDictionary(memoizeState(fn))
const memoizeArticle = (fn: Function) => mapGetDictionary(mapGetArticle(memoizeState(fn)))
const memoizeTag = (fn: Function) => mapGetDictionary(mapGetTag(memoizeState(fn)))

// FILTERS
const filterArticle = (articles: Articles, key?: number) => key === undefined ? articles : articles.get(+key)
const filterTag = (tags: Tags, key?: string) => key === undefined ? tags : tags.get(key)
const filterPublic = (articles: Articles) => new Map(filterIterable((article: any[]) => article[1].data.status, articles))
const filterPrivate = (articles: Articles) => new Map(filterIterable((article: any[]) => !article[1].data.status, articles))
const filterRecent = (articles: Articles, length: number) => new Map(untilIterable(length, filterPublic(articles)))
const filterRelated = (tag: any, fn: Function) => new Map(mapIterable(fn, tag ? tag.data.articles : []))
const filterRelevant = (tags: Tags) => new Map(filterIterable((tag: any[]) => tag[1].data.articles.length > 0, tags))

// SELECTORS
export const selectDictionary = memoizeDictionary(identity)
export const selectTag = memoizeTag(filterTag)
export const selectArticle = memoizeArticle(filterArticle)
export const selectPublicArticle = memoizeArticle(filterPublic)
export const selectPrivateArticle = memoizeArticle(filterPrivate)
export const selectRecentArticle = memoizeArticle(filterRecent)
export const selectRelatedArticle = memoizeDictionary(combineSelector(
  mapGetTag(filterTag),
  mapGetArticle((article: Article) => ({ id }: any) => [id, article.get(+id)]),
  filterRelated
))
export const selectRelevantTag = memoizeTag(filterRelevant)
