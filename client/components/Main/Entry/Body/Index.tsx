import * as React from 'react'
import { Body as Container } from '../Styles'
import Fade from 'Transition/Fade'
import Entry from './Entry'
import Related from './Related'

export interface Props {
  article: any
}

const Body = (props: Props) => (
  <Container>
    <Entry {...props} />
    <Related {...props} />
  </Container>
)

export default Body
