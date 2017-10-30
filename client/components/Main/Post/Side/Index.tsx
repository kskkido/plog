import * as React from 'react'
import { tags } from '../'
import { Container } from './Styles'
import Publish from './Publish'
import Save from './Save'
import Tag from './Tag'
import Title from './Title'

export interface Props {
  status: boolean
  tags: tags,
  title: string,
  onToggle: Function,
  onPost: Function,
  onTitle: Function,
  onTag: Function
}

const Side = (props: Props) => {
  const { status, tags, title, onPost, onTag, onTitle, onToggle } = props

  return (
  <Container>
    <Save onSubmit={onPost} />
    <Publish
      status={status}
      onToggle={onToggle}
    />
    <Title
      value={title}
      onTitle={onTitle}
    />
    <Tag
      tags={tags}
      onTag={onTag}
    />
  </Container>
  )
}

export default Side
