import * as React from 'react'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'
import { NavigationStore } from '../../../../data/store'
import Card from './Card'
import Slide from '../Slide'

export interface Props {
  mainKey: string,
  [s: string]: any
}

export interface State {
  activeIndex: number
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    activeIndex: 0
  }
  childList: string[]

  constructor(props: Props) {
    super(props)
  }

  componentWillMount() {
    const { mainKey } = this.props

    NavigationStore.subscribe(mainKey, this.setStateWrapper.bind(this))
    this.childList = NavigationStore.getSublist(mainKey)
  }

  setStateWrapper(index: number) {
    this.setState({activeIndex: index})
  }

  createCard(ratio: number) {
    return this.childList.map((el, i, { length }) =>
        <Card key={el + '_' + i} previewCount={length} />
    )
  }

  render() {
    const { length } = this.childList,
          { activeIndex } = this.state

    return (
      <Slide length={length} activeIndex={activeIndex}>
        {(ratio: number) => this.createCard(ratio)}
      </Slide>
    )
  }
}

export default LocalContainer
