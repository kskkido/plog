import * as React from 'react'
import { tagList } from '../'
import { Add, Container, Form, Input } from './Styles'
import Publish from './Publish'
import Tag from './Tag'
import Title from './Title'

export interface Props {
  tagList: tagList,
  title: string,
  onSubmit: Function,
  onTitle: Function,
  _onTagAdd: Function,
  _onTagRemove: Function,
}

const Side = (props: Props) => {
  const { tagList, title, onSubmit, onTitle, _onTagAdd, _onTagRemove } = props

  return (
  <Container>
    <Publish
      onSubmit={onSubmit} />
    <Title
      title={title}
      onTitle={onTitle}
    />
    <Tag
      tagList={tagList}
      _onTagAdd={_onTagAdd}
      _onTagRemove={_onTagRemove}
    />
  </Container>
  )
}

export default Side
