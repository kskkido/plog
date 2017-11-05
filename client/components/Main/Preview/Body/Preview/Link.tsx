import * as React from 'react'
import { Link } from 'react-router-dom'

export interface Props {
  local: boolean
  url: string,
  children?: any
}

const PreviewLink = (props: Props) =>
  props.local ?
    <Link to={props.url || '/'}>
      {props.children && props.children}
    </Link>
      :
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      {props.children && props.children}
    </a>

export default PreviewLink
