import * as React from 'react'
import Preview from '../Preview'
export interface Props {
  inputRef?: Function
}

const Recent = (props: Props) =>
    <Preview mainKey="RECENT"  inputRef={props.inputRef}/>

export default Recent
