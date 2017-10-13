import * as React from 'react'
import { Link } from 'react-router-dom'
import { entry } from './'
import { Card as Container } from './Styles'

export interface Props {
  payload: entry
}

const Card = (props: Props) => {
  const { payload } = props

  console.log(payload)

  return (
    <Container>
      <h1>{payload.title}</h1>
      <p>{payload.content}</p>
    </Container>
  )
}

export default Card
