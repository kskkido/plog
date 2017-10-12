import * as React from 'react'
import { ListCell, ListRow } from './Styles'

export interface Props {
  activeIndex: number,
  list: string[],
  onClickHandler: Function
}

export const createTable = (list: string[], activeIndex: number, onClickHandler: Function) =>
  list.map((item, i) => {
    const active = activeIndex === i

    return (
      <ListRow
        key={item + '_' + i}
        active={active}
        onClick={() => active || onClickHandler(i)}
      >
        <ListCell>
          <span>{item}</span>
        </ListCell>
      </ListRow>
    )
  })
