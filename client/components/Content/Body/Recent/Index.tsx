import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { NavigationStore } from '../../../../data/store'
export interface Props {
  inputRef?: Function
}

const Recent = (props: Props) =>
    <Preview mainKey="RECENT"  inputRef={props.inputRef}/>

export default Recent