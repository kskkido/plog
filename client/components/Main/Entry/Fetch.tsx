import * as React from 'react'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'
import { RootState } from 'Reducer'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
import Fetch from 'HOC/Fetch'
import Combine from 'HOC/Fetch/Combine'

const asyncConfig = {
  fetch: (props: any) => fetchArticleId(props.match.params.id),
  filter: (res: any) => res.data,
  cache: articleDictionary.set
}

const localConfig = {
  fetch: (props: any) => (state: RootState) => selectArticle(state, props.match.params.id),
  filter: getProps('data')
}

const Combined = Combine(
  (payload: any) => payload.content === undefined,
  asyncConfig,
  localConfig
)

export default Combined
