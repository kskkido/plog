import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { NavigationStore } from '../../../../data/store'

export interface Props {
  inputRef?: Function
}

const Article = (props: Props) => (
  <Preview mainKey="ARTICLE" inputRef={props.inputRef}/>
)

export default Article
