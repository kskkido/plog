import * as React from 'react'
import { connect } from 'react-redux'
import { TweenLite } from 'gsap'
import { Container, List, ListCell, ListRow } from './Styles'
import { MAIN_HEIGHT } from '../Styles'
import { scrollController } from '../../../'
import { RootState } from '../../../../reducers'
import { actionCreators } from '../../../../reducers/main'
import { Dispatch } from '../../../../reducers/util'
import { NavigationStore } from '../../../../data/store'
import { toArray, toHash } from './util'

// global static
const childList = Array.from(NavigationStore.getKey()),
      childHash = toHash(childList)

export interface PropState {
  main: string
}

export interface PropDispatch {
  slide: (key: string) => void
}

export interface Props extends PropState, PropDispatch {
  mainKey: string
  onMainListener: Function
}

class LocalContainer extends React.Component<Props, {}> {
  childList = NavigationStore.getKey()
  childHash = toHash(this.childList)

  constructor(props: Props) {
    super(props)
  }

  createTable (activeIndex: number) {
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
    this.props.onMainListener(nextKey, i)
  }

  render () {
    const activeIndex = this.childHash[this.props.mainKey]

    return (
      <Container>
        <List>
          {this.createTable(activeIndex)}
        </List>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  main: state.main.key
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  slide: (key: string) => dispatch(actionCreators.slideVertical({key}))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
