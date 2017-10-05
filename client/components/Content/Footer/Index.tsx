import * as React from 'react'
import { Container } from './Styles'
import { NavigationStore } from '../../../data/store'
import Navigation from './Navigation'

export interface Props {
  mainKey: string
}

export interface State {
  activeIndex: number,
  childList: string[]
}

export interface unsubscribe {
  onList: Function
}

class LocalContainer extends React.Component<Props, State> {
  childList: string[]
  onListListener: Function
  unsubscribe: Function

  constructor(props: Props) {
    super(props)

    const { mainKey } = this.props

    this.state = {
      activeIndex: NavigationStore.getIndex(mainKey),
      childList: NavigationStore.getSublist(mainKey)
    }

    this.handleClick = this.handleClick.bind(this)
    this.setStateWrapper = this.setStateWrapper.bind(this)
  }

  componentWillMount() {
    const { mainKey } = this.props

    this.onListListener = this.setStateWrapper('activeIndex'),
    this.unsubscribe = NavigationStore.subscribe(mainKey, this.onListListener)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { mainKey } = nextProps

    this.unsubscribe() && (this.unsubscribe = NavigationStore.subscribe(mainKey, this.onListListener))
    this.setState({
      activeIndex: NavigationStore.getIndex(mainKey),
      childList: NavigationStore.getSublist(mainKey)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  setStateWrapper(property: string, cb?: Function) {
    return (payload: string | number) => this.setState(() => ({[property]: payload}), cb && cb(payload))
  }

  handleClick(i: number) {
    NavigationStore.setIndex(this.props.mainKey, i)
  }

  render() {
    const { activeIndex, childList } = this.state

    return (
      <Container>
        <Navigation
          activeIndex={activeIndex}
          list={childList}
          onClickHandler={this.handleClick}
        />
      </Container>
    )
  }
}

export default LocalContainer
