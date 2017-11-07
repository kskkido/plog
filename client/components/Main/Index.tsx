import * as React from 'react'
// import { TransitionGroup } from 'react-transition-group'
import { Container } from './Styles'
import Transition from 'Transition/Overlay'
import Header from './Header'
import Overlay from './Overlay'
import Routes from './Routes'

export interface Props {
  toggle: boolean,
  onToggleOn: Function,
  onToggleOff: Function
}

export interface State {
  toggle: boolean
}

const Main = (props: Props) => {
  const { toggle, onToggleOn, onToggleOff } = props

  return (
    <Container>
      <Overlay in={toggle} onToggleOff={onToggleOff} />
      {/* {toggle && <Overlay onToggleOff={onToggleOff} />} */}
      <Header
        toggle={toggle}
        onToggleOn={onToggleOn}
        onToggleOff={onToggleOff}
      />
      <Routes />
    </Container>
  )
}

class LocalContainer extends React.Component<{}, State> {
  state: State = {
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

  render () {
    const { toggle } = this.state

    return <Main
        toggle={toggle}
        onToggleOn={this.onToggleOn}
        onToggleOff={this.onToggleOff}
      />
  }
}

export default LocalContainer
