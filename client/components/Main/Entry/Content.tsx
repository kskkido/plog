import * as React from 'react'
import Factory from '../../HOC/Fetch'
import { EntryContainer as Container } from './Styles'

export type entry = {
  title: string,
  content: string,
  date?: string,
  media?: string,
}

export interface Props {
  payload: entry
}

const Content = (props: Props) => {
  const { payload } = props

  return (
    <Container>
      <h1>{payload.title}</h1>
      <p>{payload.content}</p>
    </Container>
  )
}

export default Factory(Content)
