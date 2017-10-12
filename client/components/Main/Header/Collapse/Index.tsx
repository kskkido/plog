import * as React from 'react'
import { CollapsibleContainer as Container } from '../Styles'
import Button from './Button'

export interface Props {
  toggle: boolean,
  onToggleOn: Function,
  onToggleOff: Function
}

const Collapsible = (props: Props) => {
  const { toggle, onToggleOn, onToggleOff } = props

  return (
    <Container>
      <Button
        toggle={toggle}
        onToggleOn={onToggleOn}
        onToggleOff={onToggleOff}
      />
    </Container>
  )
}

export default Collapsible
