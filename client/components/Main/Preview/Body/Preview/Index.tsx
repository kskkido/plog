import * as React from 'react'
import { connect } from 'react-redux'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'
import { RootState } from '../../../../../reducers'
import { selectItem } from '../../../../../reducers/selector'
import Card from './Card'
import Slide from '../Slide'

export interface PropState {
  activeIndex: number,
  subList: any[],
}

export interface Props extends PropState {
  mainKey: string,
}

export interface State {}

class LocalContainer extends React.Component<Props, State> {

  createCard = (ratio: number, subList: string[]) =>
    subList.map((item: string, i: number, array: string[]) =>
        <Card
          key={item + '_' + i}
          data={item}
          previewCount={array.length}
        />
    )

  render() {
    const { activeIndex, subList } = this.props

    return (
      <Slide length={subList.length} activeIndex={activeIndex} >
        {(ratio: number) => this.createCard(ratio, subList)}
      </Slide>
    )
  }
}

const mapStateToProps = (state: RootState, props: Props) => {
  const { mainKey } = props

  return selectItem(state, mainKey)
}

export default connect<any, any, any>(mapStateToProps)(LocalContainer)
