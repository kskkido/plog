import { createSelector } from 'reselect'
import { memoizeState, identity, getProps, mapSelector } from './util'
import { callLeft, filterIterable, mapIterable, untilIterable } from '../util'
import { State } from '../dictionary'

const mapGetDictionary = mapSelector(getProps('dictionary'))
const memoizeDictionary = (fn: Function) => mapGetDictionary(memoizeState(fn))

// FILTERS
const filterArticle = getProps('article')
const filterTag = getProps('tag')
const filterPublic = (dictionary: State) => new Map(filterIterable((article: any[]) => article[1].data.status, filterArticle(dictionary)))
const filterPrivate = (dictionary: State) => new Map(filterIterable((article: any[]) => !article[1].data.status, filterArticle(dictionary)))
const filterRecent = (dictionary: State, length: number) => new Map(untilIterable(length, filterPublic(dictionary)))

// SELECTORS
export const getDictionary = memoizeDictionary(identity)
export const getArticle = memoizeDictionary(filterArticle)
export const getTag = memoizeDictionary(filterTag)
export const getPublicArticle = memoizeDictionary(filterPublic)
export const getPrivateArticle = memoizeDictionary(filterPrivate)
export const getRecentArticle = memoizeDictionary(filterRecent)
