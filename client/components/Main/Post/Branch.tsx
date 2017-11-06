import * as React from 'react'
import Branch from 'HOC/Branch'
import Fetch from 'HOC/Fetch'
import Async from 'HOC/Fetch/Async'
import CombineFetch from 'HOC/Fetch/Combine'
import Local from 'HOC/Fetch/Local'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
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
  fetch: fetchArticleId,
  filter: getProps('data'),
  query: (props: any) => [props.match.params.id],
  cache: articleDictionary.set,
}

const localConfig = {
  fetch: selectArticle,
  filter: getProps('data'),
  query: (props: any) => [props.match.params.id]
}

const FetchBranch = Branch(
  (props: object) => props.match.params.id !== undefined,
  CombineFetch(
    (props: object) => props.payload === undefined || props.payload.content === undefined,
    asyncConfig,
    localConfig
  )
)

export default FetchBranch
