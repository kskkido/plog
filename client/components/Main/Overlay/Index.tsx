import * as React from 'react'
import { Container } from './Styles'
import Transition from 'Transition/Overlay'

import Card from './Card'

export type Navigation = {
  text: string,
  url: string,
}

export interface Props {
  toggle: boolean,
  onToggleOff: Function
}

const Navigations: Navigation[] = [
  {text: 'Go home already', url: '/'},
  {text: 'Get cooking', url: '/post'},
  {text: 'All articles', url: '/entry'}
]

const Overlay = ({ onToggleOff }: Props) => {

  return (
    <Container onClick={() => onToggleOff()}>
      {Navigations.map((navigation) => <Card key={navigation.text} {...navigation} />)}
    </Container>
  )
}

export default Transition()(Overlay)
