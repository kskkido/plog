import * as React from 'react'
import { connect } from 'react-redux'
import { TweenLite } from 'gsap'
import { Container, List, ListCell, ListRow } from './Styles'
import { scrollController } from '../../../'
import { RootState } from '../../../../reducers'
import { actionCreators } from '../../../../reducers/main'
import { Dispatch } from '../../../../reducers/util'
import { NAVIGATION } from '../../../../data'
import { toArray, toHash } from './util'

// global static

export interface PropState {
  mainKey: string
}

export interface PropDispatch {
  slide: (key: string) => void
}

export interface Props extends PropState, PropDispatch {
}

class LocalContainer extends React.Component<Props, {}> {
  childList = Array.from(NAVIGATION.keys())
  childHash = toHash(this.childList)

  createTable () {
    const activeIndex = this.childHash[this.props.mainKey]

    return this.childList.map((item, i) => {
      const active: boolean = activeIndex === i

      return (
        <ListRow
          key={item + 'side'}
          active={active}
          onClick={() => active || this.handleClick(item, i)}
        >
          <ListCell>
            <span>{item}</span>
          </ListCell>
        </ListRow>
      )
    })
  }

  handleClick(nextKey: string, i: number) {
    this.props.slide(nextKey)
    scrollController.scrollTo(i)
  }

  render () {

    return (
      <Container>
        <List>
          {this.createTable()}
        </List>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  mainKey: state.main.key
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  slide: (key: string) => dispatch(actionCreators.slideVertical({key}))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
