import * as React from 'react'
import Branch from 'HOC/Branch'
import Fetch from 'HOC/Fetch'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'

const FetchBranch = Branch(
  (props: object) => props.match.params.id !== undefined,
  Fetch({
    cache: articleDictionary.set,
    fetch: (props: any) => fetchArticleId(props.match.params.id),
    filter: (article: any) => article.content !== undefined,
    query: (props: any) => [props.match.params.id],
    selector: compose(getProps('data'), selectArticle),
  })
)

export default FetchBranch
