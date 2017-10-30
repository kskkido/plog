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
      <Link to={payload.url || 'url'}>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </Link>
    </Container>
  )
}

export default Card
