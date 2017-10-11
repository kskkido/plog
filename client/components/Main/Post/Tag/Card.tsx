import * as React from 'react'
import { Tag } from './Styles'

export interface Props {
  tagName: string,
  _onClick: Function
}

const Card = (props: Props) => {

  return (
    <Tag onClick={() => props._onClick(props.tagName)}>
      {props.tagName}
    </Tag>
  )
}

export default Card
