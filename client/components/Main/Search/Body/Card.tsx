import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card as Container } from './Styles'

export interface Props {
  payload: any
}

const Card = (props: Props) => {
  const { payload } = props,
        { data } = payload

  return (
    <Container>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </Container>
  )
}

export default Card
