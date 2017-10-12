import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './'
import { Card as Container } from './Styles'

const Card = (props: Navigation) => {
  const { text, url } = props

  return (
    <Container>
      <Link to={url || '/'}>
        {text || 'placeholder'}
      </Link>
    </Container>
  )
}

export default Card
