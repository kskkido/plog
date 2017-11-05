import { createSelector } from 'reselect'
import { callLeft, compose, identity, log, unary } from 'Util/decorator'
import { filterIterable, mapIterable, untilIterable } from 'Util/generator'
import { getProps } from 'Util/getter'
import { combineSelector, memoizeState, mapSelector } from 'Util/selector'
import { State } from '../dictionary'

type Article = article
type Tag = Map<string, any>

export const mapGetDictionary = mapSelector(getProps('dictionary'))
const mapGetArticle = mapSelector(getProps('article'))
const mapGetTag = mapSelector(getProps('tag'))
const memoizeDictionary = (fn: Function) => mapGetDictionary(memoizeState(fn))
const memoizeArticle = (fn: Function) => mapGetDictionary(mapGetArticle(memoizeState(fn)))
const memoizeTag = (fn: Function) => mapGetDictionary(mapGetTag(memoizeState(fn)))

// FILTERS
const filterArticle = (article: Article, key?: string) => key === undefined ? article : article.get(key)
const filterTag = (tag: Tag, key?: string) => key === undefined ? tag : tag.get(key)
const filterPublic = (article: Article) => new Map(filterIterable((_article: any[]) => _article[1].data.status, article))
const filterPrivate = (article: Article) => new Map(filterIterable((_article: any[]) => !_article[1].data.status, article))
const filterRecent = (article: Article, length: number) => new Map(untilIterable(length, filterPublic(article)))
const filterRelated = (tag: any, fn: Function) => new Map(mapIterable(fn, tag.data.articles))

// SELECTORS
export const selectDictionary = memoizeDictionary(identity)
export const selectTag = memoizeTag(filterTag)
export const selectArticle = memoizeArticle(filterArticle)
export const selectPublicArticle = memoizeArticle(filterPublic)
export const selectPrivateArticle = memoizeArticle(filterPrivate)
export const selectRecentArticle = memoizeArticle(filterRecent)
export const selectRelatedArticle = memoizeDictionary(combineSelector(
  mapGetTag(filterTag),
  mapGetArticle((article: Article) => ({ id }: any) => [id, article.get('' + id)]),
  filterRelated
))
