import * as React from 'react'
import { Add } from './Styles'

export interface Props {
  onSubmit: Function
}

const Publish = (props: Props) => {

  return (
    <Add onClick={() => props.onSubmit()}>
      PUBLISH
    </Add>
  )
}

export default Publish
