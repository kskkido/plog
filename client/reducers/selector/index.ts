import { getItem, getNavigation, getTitle } from './navigation'
import { getArticle, getDictionary, getTag, getRecentArticle, getPublicArticle, getPrivateArticle} from './dictionary'

export const selectDictioanry = getDictionary
export const selectNavigation = getNavigation
export const selectItem = getItem
export const selectTitle = getTitle
export const selectArticle = getArticle
export const selectTag = getTag
export const selectRecentArticle = getRecentArticle
export const selectPublicArticle = getPublicArticle
export const selectPrivateArticle = getPrivateArticle

