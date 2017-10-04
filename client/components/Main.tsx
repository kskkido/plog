import * as React from 'react'
import { connect } from 'react-redux'
import { TweenMax } from 'gsap'
import { RootState } from '../reducers'
import { actionCreators as fetchActions, FETCH_COMPLETE, State as FetchState } from '../reducers/fetch'
import { ActionCreator, Dispatch } from '../reducers/utils'

import Content from './Content'

interface PropDispatch {
  fetchComplete: (fetchState: boolean) => void
}

interface PropState {
  fetched: FetchState[keyof FetchState]
}

export interface State {
  loaded: boolean
}

export interface Props extends PropDispatch, PropState {

}

const Main = (props: Props) => {

  return (
    <Content />
  )
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    loaded: false
  }

  render() {
    const { fetched } = this.props

    return <Main {...this.props} />
  }
}

const mapStateToProps = (state: RootState) => ({
  fetched: state.fetch.fetched
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchComplete: (fetchState: boolean) => dispatch(fetchActions.fetchComplete({fetched: fetchState}))
})

export default connect<PropState, PropDispatch, any>(mapStateToProps, mapDispatchToProps)(LocalContainer)
