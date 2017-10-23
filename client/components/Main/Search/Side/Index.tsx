import * as React from 'react'
import { tags, title } from '../'
import { Container, List, ListRow, ListCell } from './Styles'
import { DICTIONARY } from '../../../../data/dictionary'

export interface Props {
  tags: any,
  onTagAdd: Function,
  onTagRemove: Function
}

export interface State {
  activeIndex: number | null
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    activeIndex: null
  }

  createList = () => {
    const { tags } = this.props

    return tags.map((tag, i: number) => {
      const { tagName } = tag

      return (
        <ListRow
          key={tagName}
          onClick={() => this.onClick(tagName, i)}
        >
          <ListCell>
            {tagName}
          </ListCell>
        </ListRow>
      )
    })
  }

  onClick = (tagName: string, i: number) => {
    const { activeIndex } = this.state
    const { onTagAdd, onTagRemove } = this.props

    this.setState(() => ({activeIndex: i}), () => {
      if (activeIndex === i) {
        onTagRemove(tagName)
      } else {
        onTagAdd(tagName)
      }
    })
  }

  render() {

    return (
      <Container>
        <List>
          {this.createList()}
        </List>
      </Container>
    )
  }
}

export default LocalContainer
