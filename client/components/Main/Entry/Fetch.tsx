import * as React from 'react'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
import Fetch from 'HOC/Fetch'
import Combine from 'HOC/Fetch/Combine'

const asyncConfig = {
  fetch: fetchArticleId,
  filter: (res: any) => res.data,
  query: (props: any) => [props.match.params.id]
  cache: articleDictionary.set
}

const localConfig = {
  fetch: selectArticle,
  filter: getProps('data'),
  query: (props: any) => [props.match.params.id]
}

const Combined = Combine(
  (payload: any) => payload.content === undefined,
  asyncConfig,
  localConfig
)

export default Combined
