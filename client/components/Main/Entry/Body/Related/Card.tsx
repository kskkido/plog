import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card as Container } from '../Styles'

export interface Props {
  payload: any
}

const Card = ({ payload }: Props) => {
  const { data } = payload

  return (
    <Container>
      <h1>{data.title}</h1>
      <Link to={`/entry/${data.id}`}>
        Click me
      </Link>
    </Container>
  )
}

export default Card
