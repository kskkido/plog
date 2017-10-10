import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import { Container as SubContainer } from '../Preview/Styles'
import { KEYS } from '../../../../../data/key'
import Preview from '../Preview/Card'

export interface Props {
  inputRef?: Function
}

const Contact = (props: Props) => (
  <Container innerRef={(el: any) => props.inputRef && props.inputRef(el)}>
    <SubContainer>
      {KEYS.CONTACT}
    </SubContainer>
  </Container>
)

export default Contact
