import * as React from 'react'
import { Add } from './Styles'

export interface Props {
  onSubmit: Function
}

const Save = (props: Props) => {

  return (
    <Add onClick={() => props.onSubmit()}>
      SAVE
    </Add>
  )
}

export default Save
