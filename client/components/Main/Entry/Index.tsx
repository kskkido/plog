import * as React from 'react'
import { connect } from 'react-redux'
import { Main } from './Styles'
import Fetch from 'HOC/Fetch'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { fetchArticleId } from 'Util/server'
import Body from './Body'
import Footer from './Footer'
import Side from './Side'

export interface Props {
  payload: any,
  match?: any,
  location?: any
}

const Entry = (props: Props) => {

  return (
    <Main>
      <Side />
      <Body article={props.payload} />
      <Footer />
    </Main>
  )
}

const Factory = Fetch({
  cache: articleDictionary.set,
  fetch: (props: any) => fetchArticleId(props.match.params.id),
  filter: (article: any) => article.content,
  query: (props: any) => [props.match.params.id]
  selector: compose(getProps('data'), selectArticle),
})

export default Factory(Entry)
