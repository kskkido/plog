import * as React from 'react'
import { TweenLite } from 'gsap'
import { Container, List, ListCell, ListRow } from './Styles'
import { MAIN_HEIGHT } from '../Styles'
import { NavigationStore } from '../../../data/store'
import { toArray, toHash } from './util'

// global static
const childList = Array.from(NavigationStore.getKey()),
      childHash = toHash(childList)

export interface Props {
  mainKey: string
}

// const Side = (props: Props) => {
//   const activeIndex = childHash[props.mainKey]

//   return (
//     <Container>
//       <List>
//         {createTable(childList, activeIndex, handleClick)}
//       </List>
//     </Container>
//   )
// }

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
    // TweenLite.to(window, 0.3, {y: `${MAIN_HEIGHT * i}vh`})
    NavigationStore.dispatch('MAIN', nextKey)
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

export default LocalContainer
