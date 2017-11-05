import * as React from 'react'
import { connect } from 'react-redux'
import { Container, List, ListRow, ListCell } from './Styles'
import { RootState } from 'Reducer'
import { slideHorizontal } from 'Reducer/sublist'
import { Dispatch } from 'Reducer/util'
import { selectTitle } from 'Reducer/selector'

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
  handleClick = (i: number) => {
    this.props.slide(i)
  }

  createTable = () => {
    const { activeIndex, subList } = this.props

    return subList.map((item: string, i: number) => {
      const active = activeIndex === i

      return (
        <ListRow
          key={item + '_' + i}
          active={active}
          onClick={() => active || this.handleClick(i)}
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
        <List>
          {this.createTable()}
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
