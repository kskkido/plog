import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card as Container, Button } from './Styles'
import Cards from 'HOC/Cards'

export interface Props {
  payload: any
}

const Card = ({ payload }: Props) => {
  const { data } = payload

  return (
    <Container>
      <h1>{data.title}</h1>
      <Link to={`/post/${data.id}`}>
        <Button>Edit</Button>
      </Link>
    </Container>
  )
}

export default Cards(Card)
