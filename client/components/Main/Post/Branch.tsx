import * as React from 'react'
import Branch from 'HOC/Branch'
import Async from 'HOC/Fetch/Async'
import CombineFetch from 'HOC/Fetch/Combine'
import Local from 'HOC/Fetch/Local'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
import { RootState } from 'Reducer'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'

// const FetchBranch = Branch(
//   (props: object) => props.match.params.id !== undefined,
//   Fetch({
//     cache: articleDictionary.set,
//     fetch: (props: any) => fetchArticleId(props.match.params.id),
//     filter: (article: any) => article.content !== undefined,
//     query: (props: any) => [props.match.params.id],
//     selector: compose(getProps('data'), selectArticle),
//   })
// )

const asyncConfig = {
  fetch: (props: any) => fetchArticleId(props.match.params.id),
  filter: getProps('data'),
  cache: articleDictionary.set,
}

const localConfig = {
  fetch: (props: any) => (state: RootState) => selectArticle(state, props.match.params.id),
  filter: getProps('data')
}

const FetchBranch = Branch(
  (props: object) => props.match.params.id !== undefined,
  CombineFetch(
    (payload: any) => payload.content === undefined || payload.content === null,
    asyncConfig,
    localConfig
  )
)

export default FetchBranch
