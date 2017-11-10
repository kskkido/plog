import * as React from 'react'
import { Container } from './Styles'
import Modal from 'HOC/Modal'
import Button from './Button'
import Logo from './Logo'
import Overlay from './Overlay'

export interface Props {
  toggle: boolean,
  onToggleOn: Function,
  onToggleOff: Function
}

class Header extends React.Component<any, any> {
  state = {
    toggle: false
  }

  onChange = (toggle: boolean) => {
    this.setState(() => ({toggle}))
  }

  onToggleOn = () => {
    this.onChange(true)
  }

  onToggleOff = () => {
    this.onChange(false)
  }

  render() {
    const { toggle } = this.state

    return (
      <Container>
        <Logo />
        <Button
          toggle={toggle}
          onToggleOn={this.onToggleOn}
          onToggleOff={this.onToggleOff}
        />
        <Modal
          elementType={'div'}
          root={'#overlay'}
        >
          <Overlay in={toggle} onToggleOff={this.onToggleOff} />
        </Modal>
      </Container>
    )
  }
}

export default Header
