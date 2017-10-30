import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../reducers'

export interface PropState {
  storePayload?: any
}

export interface Props extends PropState {
  selector: Function,
  fetch: Function,
  query?: string[],
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
      const { fetch, storePayload } = this.props

      if (storePayload) {
        this.onReady(storePayload)
      } else {
        fetch()
          .then((res: any) => this.onReady(res.data))
      }
    }

    onReady = (payload: any) => {
      this.setState(() => ({ ready: true, payload}))
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

  const mapStateToProps = (state: RootState, props: Props): PropState => {
    const { query, selector } = props
          , storePayload = query ? selector(state, ...query) : props.selector(state)

    return storePayload ?
      { storePayload } :
      {}
    }

  return connect<any, any, any>(mapStateToProps)(LocalContainer)
}

export default Factory
