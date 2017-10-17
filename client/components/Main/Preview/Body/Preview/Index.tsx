import * as React from 'react'
import { connect } from 'react-redux'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'
import { DICTIONARY } from '../../../../../data/dictionary'
import Card from './Card'
import Slide from '../Slide'

export interface Props {
  mainKey: string,
  inputRef?: Function,
  navigation?: any
  [s: string]: any
}

export interface State {
  activeIndex: number
}

class LocalContainer extends React.Component<Props, State> {
  childList: string[]
  dictionary: any

  componentWillMount() {
    const { mainKey } = this.props

    this.dictionary = DICTIONARY.get(mainKey)
  }

  createCard(ratio: number) {
    const { navigation } = this.props

    return navigation.subList.map((item: string, i: number, array: string[]) =>
        <Card
          key={item + '_' + i}
          data={this.dictionary.get(item)}
          previewCount={array.length}
        />
    )
  }

  render() {
    const { navigation: { activeIndex, subList } } = this.props
    console.log(activeIndex, subList, 'PREVIEW')

    return (
      <Slide length={subList.length} activeIndex={activeIndex} inputRef={this.props.inputRef}>
        {(ratio: number) => this.createCard(ratio)}
      </Slide>
    )
  }
}

export default LocalContainer
