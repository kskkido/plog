import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Line, List, ListRow, ListCell, Slider } from './Styles'
import { RootState } from 'Reducer'
import { slideHorizontal } from 'Reducer/sublist'
import { Dispatch } from 'Reducer/util'
import { selectTitle } from 'Reducer/selector'
import { slide } from './util'

export interface PropState {
  activeIndex: number,
  subList: any[]
}

export interface PropDispatch {
  slide: (i: number) => void
}

export interface Props extends PropState, PropDispatch {
}

class LocalContainer extends React.Component<Props, {}> {
  componentWillReceiveProps(nextProps: Props) {
    slide(this.ref, nextProps.activeIndex)
  }

  handleClick = (i: number) => {
    this.props.slide(i)
  }

  handleMouseOver = (i: number) => {
    slide(this.ref, i)
  }

  createTable = (subList: any[], activeIndex: number) => {
    return subList.map((item: string, i: number) => {
      const active = activeIndex === i

      return (
        <ListRow
          key={item + '_' + i}
          active={active}
          onClick={() => active || this.handleClick(i)}
          onMouseOver={() => this.handleMouseOver(i)}
          onMouseOut={() => this.handleMouseOver(activeIndex)}
        >
          <ListCell>
            <span>{item}</span>
          </ListCell>
        </ListRow>
      )
    })
  }

  render() {
    const { activeIndex, subList } = this.props

    return (
      <Container>
        <Slider length={subList.length} innerRef={(div: any) => this.ref = div}>
          <Line />
        </Slider>
        <List>
          {this.createTable(subList, activeIndex)}
        </List>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const mainKey = state.main.key

  return selectTitle(state, mainKey)
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  slide: (index: number) => dispatch(slideHorizontal(index))
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LocalContainer)
