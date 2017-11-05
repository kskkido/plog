import * as React from 'react'
import { Container } from './Styles'
import Tags from './Tags'
import Title from './Title'

export interface PropTags {
  queryTags: Set<string>,
  tags: any,
  onTag: Function
}

export interface PropTitle {
  queryTitle: string,
  onTitle: Function
}

export interface Props extends PropTags, PropTitle {}

const Side = (props: Props) => {
  const { tags, queryTags, queryTitle, onTag, onTitle} = props

  return (
    <Container>
      <Title
        queryTitle={queryTitle}
        onChange={onTitle}
      />
      <Tags
        queryTags={queryTags}
        tags={tags}
        onClick={onTag}
      />
    </Container>
  )
}

export default Side
