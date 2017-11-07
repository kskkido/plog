import * as React from 'react'
import { Input } from './Styles'
import { PropTitle } from './'


const Title = ({ queryTitle, onChange }: PropTitle) =>
  <Input
    placeholder="Search by title..."
    value={queryTitle}
    onChange={(e) => onChange(e.target.value)}
  />

export default Title
