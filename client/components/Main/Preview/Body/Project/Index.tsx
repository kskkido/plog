import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import { KEYS } from '../../../../../data/key'
import Preview from '../Preview'

export interface Props {
  inputRef?: Function
}

const Project = (props: Props) =>
  <Preview mainKey={KEYS.PROJECT} inputRef={props.inputRef}/>


export default Project
