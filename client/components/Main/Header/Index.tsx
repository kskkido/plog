import * as React from 'react'
import { Container } from './Styles'
import Collapse from './Collapse'
import Logo from './Logo'

export interface Props {
  toggle: boolean,
  onToggleOn: Function,
  onToggleOff: Function
}

const Header = (props: Props) => {
  const { toggle, onToggleOn, onToggleOff } = props

  return (
    <Container>
      <Logo />
      <Collapse
        toggle={toggle}
        onToggleOn={onToggleOn}
        onToggleOff={onToggleOff}
      />
    </Container>
  )
}

export default Header
