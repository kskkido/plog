import * as React from 'react'

export interface State {
  toggle: boolean
}

const Factory = (Component: any) => {
  class LocalContainer extends React.Component<any, State> {
    state: State = {
      toggle: false
    }

    onToggle = (cb?: Function) => {
      this.setState(({toggle}) => ({toggle: !toggle}), () => cb && cb()) // where to place this
    }

    render () {
      const { toggle } = this.state

      return (
        <Component
          {...this.props}
          toggle={toggle}
          onChange={this.onToggle}
        />
      )
    }
  }

  return LocalContainer
}

export default Factory
