import * as React from 'react'
import { Container } from './Styles'
import Factory from '../../../HOC/Fetch'
import Card from './Card'

export type entry = {
  title: string,
  content: string,
  date?: string,
  media?: string,
}

export interface Props {
  payload: entry[]
}

const Content = (props: Props) => {
  const { payload } = props

  return (
    <Container>
      {payload.map((entry, i) =>
        <Card key={'card_' + i} payload={entry}/>
      )}
    </Container>
  )
}

export default Factory(Content)
