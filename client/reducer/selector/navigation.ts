import { compose, identity } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { mapIterable } from 'Util/generator'
import { combineSelector, memoizeState, mapSelector } from 'Util/selector'
import { mapGetDictionary } from './dictionary'
import { State } from '../navigation'

// UTILITY
interface alias {[property: string]: string}

const ALIAS: alias = {recent: 'article'}

const getAlias = (property: string) => ALIAS[property] ? ALIAS[property] : property

// MEMOIZE
const mapGetNavigation = mapSelector(getProps('navigation'))
const mapSublist = mapGetNavigation((navigation: any, key: string) => navigation[key])
const mapDictionaryAlias = mapGetDictionary((dictionary: any, key: string) => dictionary[getAlias(key)])
const memoizeNavigation = (fn: Function) => mapGetNavigation(memoizeState(fn))

// FILTER
const filterKey = (dictionary: any) => (key: string) => dictionary.get(key) || {}
const filterTitle = (dictionary: any) => (key: string) => dictionary.has(key) ? dictionary.get(key).data.title : {}
const filterItemBy = (fn: Function) =>
  ({ activeIndex, subList }: any, dictionary: any) => ({
    activeIndex,
    subList: Array.from(mapIterable(fn(dictionary), subList))
  })

// SELECTOR
export const selectNavigation = memoizeNavigation(identity)
export const selectItem = memoizeState(combineSelector(mapSublist, mapDictionaryAlias, filterItemBy(filterKey)))
export const selectTitle = memoizeState(combineSelector(mapSublist, mapDictionaryAlias, filterItemBy(filterTitle)))
