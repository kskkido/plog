import { combineSelector, identity, memoizeState, mapSelector, getProps } from './util'
import { mapIterable } from '../util'
import { getDictionary } from './dictionary'
import { State } from '../navigation'

interface alias {[property: string]: string}

const ALIAS: alias = {recent: 'article'}
const getAlias = (property: string) => ALIAS[property] ? ALIAS[property] : property

// MEMOIZE
const mapGetNavigation = mapSelector(getProps('navigation'))
const memoizeNavigation = (fn: Function) => mapGetNavigation(memoizeState(fn))

// FILTER
const filterKey = (dictionary: any) => (key: string) => dictionary.get(key) || 'NOT FOUND'
const filterTitle = (dictionary: any) => (key: string) => dictionary.has(key) ? dictionary.get(key).data.title : 'NOT FOUND'
const filterItemBy = (fn: Function) => (navigation: any, dictionary: any, key: string) => {
    const { activeIndex, subList } = navigation[key]
          , subDict = dictionary[getAlias(key)]

    return {
      activeIndex,
      subList: Array.from(mapIterable(fn(subDict), subList))
    }
  }

// SELECTOR
export const getNavigation = memoizeNavigation(identity)
export const getItem = memoizeState(combineSelector(getNavigation, getDictionary, filterItemBy(filterKey)))
export const getTitle = memoizeState(combineSelector(getNavigation, getDictionary, filterItemBy(filterTitle)))
