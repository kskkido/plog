import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { KEYS } from '../../../../../data/key'

export interface Props {
  inputRef?: Function
}

const Article = (props: Props) => (
  <Preview mainKey={KEYS.ARTICLE} inputRef={props.inputRef}/>
)

export default Article
