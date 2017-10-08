import * as React from 'react'
import  * as ScrollMagic from 'scrollmagic'
import { connect } from 'react-redux'
import Content from './Main'

export interface State {
  loaded: boolean
}

export interface Props {
}

export const scrollController = new ScrollMagic.Controller({
  loglevel: 2,
  globalSceneOptions: {
    triggerHook: 0.1
  }
})

const Loaded = (props: Props) => {

  return (
    <Content />
  )
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    loaded: false
  }

  render() {
    return <Loaded />
  }
}

export default LocalContainer

// const mapStateToProps = (state: RootState) => ({
//   fetched: state.fetch.fetched
// })
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   fetchComplete: (fetchState: boolean) => dispatch(fetchActions.fetchComplete({fetched: fetchState}))
// })

// export default connect<PropState, PropDispatch, any>(mapStateToProps, mapDispatchToProps)(LocalContainer)
