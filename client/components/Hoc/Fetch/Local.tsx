import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { identity } from 'Util/decorator'

export interface PreProps {
  fetch: Function,
  filter: Function,
  query: Function,
}

export interface PropState {
  payload: any
}

const Factory = ({
  fetch,
  filter = identity,
  query = identity
}: PreProps) => (Base: any) => {
  class LocalContainer extends React.Component<any, {}> {

    shouldComponentUpdate() {
      return false // hackity hackathon
    }

    render() {

      return (
        <Base
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = (state: RootState, props: any): PropState => {
    const selected = fetch(query(props))(state)

    return {
      payload: selected !== undefined ? filter(selected) : null
    }
  }

  return connect<any, any, any>(mapStateToProps)(LocalContainer)
}

export default Factory
