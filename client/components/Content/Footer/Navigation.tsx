import * as React from 'react'
import { List, ListCell, ListRow } from './Styles'

interface Props {
  activeIndex: number,
  list: string[],
  onClickHandler: Function
}

const createTable = (props: Props) =>
  props.list.map((item, i) => {
    const active = props.activeIndex === i

    return (
      <ListRow
        key={item + 'footer'}
        active={active}
        onClick={() => active || props.onClickHandler(i)}
      >
        <ListCell>
          <span>{item}</span>
        </ListCell>
      </ListRow>
    )
  })

const Navigation = (props: Props) => {

  return (
    <List>
      {createTable(props)}
    </List>
  )
}

export default Navigation
