import * as React from 'react'
import { Input } from './Styles'
import { PropTitle } from './'


const Title = ({ queryTitle, onTitleChange }: PropTitle) =>
  <Input value={queryTitle} onChange={(e) => onTitleChange(e.target.value)} />

export default Title
