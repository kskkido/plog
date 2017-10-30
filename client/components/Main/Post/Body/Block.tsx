import * as React from 'react'
import { BLOCK_STYLE } from './config'
import { Container } from './Styles'
import Button from './Button'

export interface Props {
  onToggle: Function
}

const BlockControl = (props: Props) => {

  return (
    <Container>
      {BLOCK_STYLE.map((type) =>
        <Button
          key={type.label}
          label={type.label}
          style={type.style}
          onToggle={props.onToggle}
        />
      )}
    </Container>
  )
}

export default BlockControl
