import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { identity } from 'Util/decorator'
import { Dispatch } from 'Util/reducer'

export interface PreProps {
  fetch: Function,,
  cache?: Function,
  filter?: Function,
  query?: Function,
}

export interface PropDispatch {
  cache: any
}

export interface State {
  payload: any
}

const Factory = ({
  fetch,
  cache,
  filter = identity,
  query = (props: any) => [] // meh
}: PreProps) => (Component: any) => {
  class LocalContainer extends React.Component<any, aby> {
    constructor (props) {
      super(props)

      const copy = Object.assign({}, props)
      delete copy.cache

      this.state = Object.assign({}, copy, {payload: null})
    }

    componentWillMount() {
      this.attempt(this.props)
    }

    attempt = (props: any) => {
      const { cache } = props

      fetch(...query(props))
        .then((res: any) => {
          const payload = filter(res)

          cache(payload)
          this.ready(payload)
        })
    }

    ready = (payload: any) => this.setState(() => ({ payload }))

    render() {
      if (this.state.payload === null) {
        return <span>not ready dude</span>
      }

      return (
        <Component
          {...this.state}
        />
      )
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch): PropDispatch =>
    ({cache:  cache instanceof Function ? (payload: any) => dispatch(cache(payload)) : identity})

  return connect<any, any, any>(null, mapDispatchToProps)(LocalContainer)
}

export default Factory
