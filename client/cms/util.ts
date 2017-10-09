import { DICTIONARY, setDictionary } from '../data/dictionary'
import { KEYS } from '../data/key'

export const checkDictionary = (fn: Function) => (key: string) =>
  DICTIONARY.has(key) ?
    DICTIONARY.get(key) :
    fn(key)
    .then(
      (res: any) => (setDictionary(KEYS.ARTICLE)(res.data), res),
      (_: any) => ({data: {title: 'NOT FOUND', content: 'HA HA'}})
    )

export const toUrl = (str: string) => str.replace(/\s/g, '_')
export const toTitle = (str: string) => str.replace(/_/, ' ')
