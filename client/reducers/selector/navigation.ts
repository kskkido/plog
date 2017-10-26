import { memoizeState, getProps } from './util'
import { mapIterable } from '../util'
import { getByKeys } from './dictionary'
import { State } from '../navigation'

interface alias {[property: string]: string}

const ALIAS: alias = {recent: 'article'}

const getAlias = (property: string) => ALIAS[property] ? ALIAS[property] : property

const getNavigation = getProps('navigation')

const mapItems = (fn: Function) => (state: any, key: string) => {
  const { activeIndex, subList } = getNavigation(state)[key]

  return {
    activeIndex,
    subList: Array.from(mapIterable(fn, getByKeys(state, getAlias(key), subList)))
  }
}

export const getItem = memoizeState(mapItems((i: any) => i))
export const getTitle = memoizeState(mapItems((i: any) => i.data.title || 'undefined'))
