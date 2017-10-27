import * as React from 'react'
import { Container } from './Styles'
import Tags from './Tags'
import Title from './Title'

export interface PropTags {
  tags: any,
  queryTags: Set<string>,
  onTagClick: Function
}

export interface PropTitle {
  queryTitle: string,
  onTitleChange: Function
}

export interface Props extends PropTags, PropTitle {}

const Side = (props: Props) => {
  const { tags, queryTags, queryTitle, onTagClick, onTitleChange} = props

  return (
    <Container>
      <Title
        queryTitle={queryTitle}
        onTitleChange={onTitleChange}
      />
      <Tags
        tags={tags}
        queryTags={queryTags}
        onTagClick={onTagClick}
      />
    </Container>
  )
}

export default Side
