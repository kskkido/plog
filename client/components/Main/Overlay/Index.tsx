import * as React from 'react'
import { Container } from './Styles'

import Card from './Card'

export type Navigation = {
  text: string,
  url: string,
}

export interface Props {
  onToggleOff: Function
}

const Navigations: Navigation[] = [
  {text: 'Go home already', url: '/'},
  {text: 'Get cooking', url: '/post'},
  {text: 'All articles', url: '/search'}
]

const Overlay = (props: Props) => {

  return (
    <Container onClick={() => props.onToggleOff()}>
      {Navigations.map((navigation) => <Card key={navigation.text} {...navigation} />)}
    </Container>
  )
}

export default Overlay
