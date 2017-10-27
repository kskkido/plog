import * as React from 'react'
import { PropTitle } from './'


const Title = ({ queryTitle, onTitleChange }: PropTitle) =>
  <input value={queryTitle} onChange={(e) => onTitleChange(e.target.value)} />

export default Title
