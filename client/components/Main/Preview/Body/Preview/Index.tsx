import * as React from 'react'
import { connect } from 'react-redux'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'
import { NavigationStore } from '../../../../../data/store'
import { DICTIONARY } from '../../../../../data/dictionary'
import Card from './Card'
import Slide from '../Slide'

export interface Props {
  mainKey: string,
  inputRef?: Function,
  [s: string]: any
}

export interface State {
  activeIndex: number
}

class LocalContainer extends React.Component<Props, State> {
  childList: string[]
  dictionary: any
  unsubscribe: Function

  constructor(props: Props) {
    super(props)

    this.state = {
      activeIndex: NavigationStore.getIndex(this.props.mainKey),
    }
  }

  componentWillMount() {
    const { mainKey } = this.props
    this.unsubscribe = NavigationStore.subscribe(mainKey, this.setStateWrapper.bind(this))
    this.childList = NavigationStore.getSublist(mainKey)
    this.dictionary = DICTIONARY.get(mainKey)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  setStateWrapper(index: number) {
    this.setState({activeIndex: index})
  }

  createCard(ratio: number) {

    return this.childList.map((el, i, { length }) =>
        <Card
          key={el + '_' + i}
          data={this.dictionary.get(el)}
          previewCount={length}
        />
    )
  }

  render() {
    const { length } = this.childList,
          { activeIndex } = this.state

    return (
      <Slide length={length} activeIndex={activeIndex} inputRef={this.props.inputRef}>
        {(ratio: number) => this.createCard(ratio)}
      </Slide>
    )
  }
}

export default LocalContainer
