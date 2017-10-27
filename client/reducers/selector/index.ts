import { getItem, getTitle } from './navigation'
import { getArticle, getTag, getByKey, getByKeys, getRecentArticle, getVisibleArticle } from './dictionary'


export const selectItem = getItem
export const selectTitle = getTitle
export const selectArticle = getArticle
export const selectTag = getTag
export const selectByKey = getByKey
export const selectByKeys = getByKeys
export const selectArticleByKey = (state: any, id: string) => selectByKey(state, 'article', id)
export const selectRecentArticle = getRecentArticle
export const selectVisibleArticle = getVisibleArticle

