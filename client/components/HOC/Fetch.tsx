import * as React from 'react'

export interface Props {
  fetchMethod: Function,
  fetchCallback?: Function,
  [key: string]: any
}

export interface State {
  ready: boolean,
  payload: any
}


const Factory = (Component: any) => {
  class LocalContainer extends React.Component<Props, State> {
    state: State = {
      ready: false,
      payload: null
    }

    componentWillMount() {
      const { fetchMethod } = this.props

      fetchMethod()
        .then((res: any) => this.onChange(res.data))
        .catch(console.error)
    }

    onChange(payload: any) {
      const { fetchCallback } = this.props

      this.setState(() => ({ready: true, payload}), () => fetchCallback && fetchCallback())
    }

    render() {
      const { ready, payload } = this.state

      if (!ready) {
        return <span>not ready dude</span>
      }

      return (
        <Component
          {...this.props}
          payload={payload}
        />
      )
    }
  }

  return LocalContainer
}

export default Factory
