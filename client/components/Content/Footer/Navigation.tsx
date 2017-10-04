import * as React from 'react'
import { List, ListCell, ListRow } from './Styles'

interface Props {

}

interface State {
  activeIndex: number,
  list: string[]
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    activeIndex: 0,
    list: ['ARTICLE1', 'ARTICLE2', 'ARTICLE3', 'ARTICLE4']
  }

  listRef: any[]

  constructor(props: Props) {
    super(props)
  }

  componentWillMount() {
    this.listRef = []
  }

  createTable () {

    return this.state.list.map((item, i) => {

      return (
        <ListRow key={item + 'side'} innerRef={el => this.listRef[i] = el}>
          <ListCell>
            <span>{item}</span>
          </ListCell>
        </ListRow>
      )
    })
  }

  render() {

    return (
      <List>
        {this.createTable()}
      </List>
    )
  }
}

export default LocalContainer
