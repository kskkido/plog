import * as React from 'react'
import { Body as Container } from '../Styles'
import Content from './Content'
import Related from './Related'

export interface Props {
  article: any
}

const Body = (props: Props) => (
  <Container>
    <Content {...props} />
    <Related {...props} />
  </Container>
)

export default Body
