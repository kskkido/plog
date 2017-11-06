import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { identity } from 'Util/decorator'
import { Dispatch } from 'Util/reducer'

export interface PreProps {
  fetch?: Function,
  selector: Function,
  cache?: Function,
  filter?: Function,
  query?: Function,
}

export interface PropState {
  storePayload?: any
}

export interface PropDispatch {
  cache: any
}

export interface State {
  payload: any
}

const Factory = ({
  fetch,
  selector,
  cache,
  filter = identity,
  query = (props: any) => [] // meh
}: PreProps) => (Component: any) => {
  class LocalContainer extends React.Component<any, State> {
    state: State = {
      payload: null
    }

    componentWillMount() {
      this.attempt(this.props)
    }

    attempt = (props: any) => {
      const { cache, storePayload } = props

      if (filter(storePayload)) {
        this.ready(storePayload)
      } else {
        fetch && fetch(props)
          .then((res: any) => {
            cache(res.data)
            this.ready(res.data)
          })
      }
    }

    ready = (payload: any) => this.setState(() => ({ payload }))

    render() {
      const { payload } = this.state

      if (payload === null) {
        return <span>not ready dude</span>
      }

      return (
        <Component
          {...this.props} // currently sends both payload and storePayload currently...
          payload={payload}
        />
      )
    }
  }

  const mapStateToProps = (state: RootState, props: any): PropState => {
    const storePayload = selector(state, ...query(props))

    return storePayload !== undefined ?
      { storePayload } :
      {}
  }

  const mapDispatchToProps = (dispatch: Dispatch): PropDispatch =>
    cache instanceof Function ?
      {cache: (payload: any) => dispatch(cache(payload))} :
      {cache: identity}

  return connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LocalContainer)
}

export default Factory
