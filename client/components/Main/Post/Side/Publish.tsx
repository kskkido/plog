import * as React from 'react'
import { Add } from './Styles'

export interface Props {
  status: boolean,
  onToggle: Function
}

const Publish = ({ status, onToggle }: Props) => {

  return (
    <Add onClick={() => onToggle(!status)}>
      {status ? 'CLOSE ARTICLE' : 'OPEN ARTICLE'}
    </Add>
  )
}

export default Publish
