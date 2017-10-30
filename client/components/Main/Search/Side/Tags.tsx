import * as React from 'react'
import { List, ListRow, ListCell } from './Styles'
import { PropTags } from './'

const createList = ({tags, queryTags, onTagClick}: PropTags) =>
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

const Tags = (props: PropTags) =>
    <List>
      {createList(props)}
    </List>

export default Tags
