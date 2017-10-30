import * as React from 'react'
import { EntryContainer as Container } from './Styles'

export interface Props {
  article: any
}

const Content = (props: Props) => {
  const { article } = props,
        { data } = article

  return (
    <Container>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </Container>
  )
}

export default Content
