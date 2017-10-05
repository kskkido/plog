import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Main } from './Styles'
import { NavigationStore } from '../../data/store'

import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Side from './Side'

export interface State {
  mainKey: string
}

const Content = (props: State) => (
  <Container>
    <Header />
    <Main>
      <Side mainKey={props.mainKey}/>
      <Body />
    </Main>
    <Footer mainKey={props.mainKey}/>
  </Container>
)

class LocalContainer extends React.Component<any, State> {
  state: State = {
    mainKey: NavigationStore.getMain()
  }
  onMainListener: Function
  unsubscribe: Function

  constructor(props: any) {
    super(props)

    this.setStateWrapper = this.setStateWrapper.bind(this)
  }

  componentWillMount() {
    this.onMainListener = this.setStateWrapper('mainKey')
    this.unsubscribe = NavigationStore.subscribe('MAIN', this.onMainListener)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  setStateWrapper(property: string, cb?: Function) {
    return (payload: string) => this.setState(() => ({[property]: payload}), cb && cb(payload))
  }

  render() {

    return <Content mainKey={this.state.mainKey} />
  }
}

export default LocalContainer
