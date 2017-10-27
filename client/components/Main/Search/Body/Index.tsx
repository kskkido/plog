import * as React from 'react'
import { Container, CardContainer } from './Styles'
import { filterQuery, Query } from './util'
import Card from './Card'

export interface Entry {
  data: object,
  url: string,
  local: boolean
}

export interface Props {
  articles: any[]
  query: Query
}

const Content = (props: Props) => {
  const { articles, query } = props
  const filter = filterQuery(query)

  return (
    <Container>
      <CardContainer>
        {articles.map((entry: Entry, i: number) => filter(entry) && <Card key={'card_' + i} payload={entry}/>)}
      </CardContainer>
    </Container>
  )
}

export default Content
