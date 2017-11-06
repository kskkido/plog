import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card as Container } from './Styles'
import Cards from 'HOC/Cards'

export interface Props {
  payload: any
}

const Card = ({ payload }: Props) => (
    <Container>
      <h1>{payload.title}</h1>
      <p>{payload.preview}</p>
    </Container>
  )

export default Cards(Card)
