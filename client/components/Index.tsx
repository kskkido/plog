import * as React from 'react'
import  * as ScrollMagic from 'scrollmagic'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { fetchInitial } from 'Reducer/fetch'
import { Dispatch } from 'Util/reducer'
import Content from './Main'
import Preload from './Preload'

export const scrollController = new ScrollMagic.Controller({
  loglevel: 2,
  globalSceneOptions: {
    triggerHook: 0.1
  }
})

export interface PropState {
  fetched: boolean,
}

export interface PropDispatch {
  fetchInitial: () => void
}

export interface Props extends PropState, PropDispatch {
}

export interface State {
  fetched: boolean
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    fetched: false
  }

  componentWillMount() {
    this.props.fetchInitial()
  }

  render() {
    const { fetched } = this.props

    return fetched ?
      <Content /> :
      <Preload />
  }
}

const mapStateToProps = (state: RootState) => ({
  fetched: state.fetch.fetched
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchInitial: () => dispatch(fetchInitial)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalContainer))
