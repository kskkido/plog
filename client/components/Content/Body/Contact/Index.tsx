import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview/Card'

export interface Props {
  inputRef?: Function
}

const Contact = (props: Props) => (
  <Container innerRef={(el: any) => props.inputRef && props.inputRef(el)}>
    Contact
  </Container>
)

export default Contact
