import * as React from 'react'
import { Container, CardContainer } from './Styles'
import Card from './Card'

export interface Props {
  articles: any[]
}

const Body = ({ articles }: Props) => {
  console.log(articles)

  return (
    <Container>
      <CardContainer>
        {articles.map((entry: any, i: number) => <Card key={'admin_' + i} payload={entry} />)}
      </CardContainer>
    </Container>
  )
}

export default Body
