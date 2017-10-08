import * as React from 'react'
import { connect } from 'react-redux'
import { Main } from '../Styles'
import { NavigationStore } from '../../../data/store'

import Body from './Body'
import Footer from './Footer'
import Route from './Route'
import Side from './Side'

export interface Props {
  mainKey: string,
  onMainListener: Function
}

export interface State {
  mainKey: string
}

const Content = (props: Props) => (
  <div>
    <Main>
      <Side
        mainKey={props.mainKey}
        onMainListener={props.onMainListener}
      />
      <Body onMainListener={props.onMainListener} />
    </Main>
    <Footer mainKey={props.mainKey}/>
  </div>
)

class LocalContainer extends React.Component<any, State> {
  state: State = {
    mainKey: NavigationStore.getMain()
  }

  constructor(props: any) {
    super(props)

    this.setStateWrapper = this.setStateWrapper.bind(this)
  }

  setStateWrapper(property: string, cb?: Function) {
    return (payload: string): void => this.setState(() => ({[property]: payload}), cb && cb(payload))
  }

  render() {

    return <Content
      mainKey={this.state.mainKey}
      onMainListener={this.setStateWrapper('mainKey')}
    />
  }
}

export default LocalContainer
