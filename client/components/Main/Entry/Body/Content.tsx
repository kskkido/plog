import * as React from 'react'
import { Content as Container } from './Styles'

export interface Props {
  article: any
}

const Content = (props: Props) => {
  const { article } = props

  return (
    <Container>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </Container>
  )
}

export default Content
