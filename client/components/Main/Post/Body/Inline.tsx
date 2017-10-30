import * as React from 'react'
import { INLINE_STYLE } from './config'
import { Container } from './Styles'
import Button from './Button'

export interface Props {
  onToggle: Function
}

const InlineControl = (props: Props) => {

  return (
    <Container>
      {INLINE_STYLE.map((type) =>
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

export default InlineControl
