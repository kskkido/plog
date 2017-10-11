import * as React from 'react'
import { Button } from './Styles'

export interface Props {
  onToggle: Function
  label: string,
  style: string
}

export interface State {
  active: boolean
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    active: false
  }

  onToggle = () => {
    this.setState(({active}) => ({active: !active}), () => this.props.onToggle(this.props.style))
  }

  render () {

    return (
      <Button active={this.state.active} onClick={this.onToggle}>
        {this.props.label}
      </Button>
    )
  }
}

export default LocalContainer
