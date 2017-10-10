import * as React from 'react'
import { KEYS } from '../../../../../data/key'
import Preview from '../Preview'

export interface Props {
  inputRef?: Function
}

const Recent = (props: Props) =>
    <Preview mainKey={KEYS.RECENT}  inputRef={props.inputRef}/>

export default Recent
