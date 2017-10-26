import * as React from 'react'
import { List, ListRow, ListCell } from './Styles'

export interface Props {
  tags: any,
  queryTags: Set<string>,
  onTagClick: Function
}

const createList = ({tags, queryTags, onTagClick}: Props) =>
  tags.map((tag: any, i: number) => {
    const [ tagName ] = tag

    return (
      <ListRow
        key={tagName}
        active={queryTags.has(tagName)}
        onClick={() => onTagClick(tagName, i)}
      >
        <ListCell>
          {tagName}
        </ListCell>
      </ListRow>
    )
  })

const Tags = (props: Props) =>
    <List>
      {createList(props)}
    </List>

export default Tags
