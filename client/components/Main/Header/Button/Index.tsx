import * as React from 'react'
import { CollapsibleContainer as Container } from '../Styles'
import { onHoverShape, onToggleShape, onToggleOnCallback, onToggleOffCallback } from './animation'
import SVG from './SVG'

export interface Props {
  toggle: boolean,
  onToggleOn: Function, // pass to onToggleOnCallback
  onToggleOff: Function,
}

const Button = (props: Props) => {
  const { toggle, onToggleOn, onToggleOff } = props

  return (
    <Container>
      <SVG
        toggle={toggle}
        onChange={(_toggle: boolean) => _toggle ? onToggleOff() : onToggleOn()}
        onHoverShape={onHoverShape}
        onToggleShape={onToggleShape}
        onToggleOnCallback={onToggleOnCallback()}
        onToggleOffCallback={onToggleOffCallback()}
      />
    </Container>
  )
}

export default Button
