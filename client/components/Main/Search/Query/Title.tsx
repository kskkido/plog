import * as React from 'react'

export interface PropsInput {
  queryTitle: string,
  onTitleChange: Function
}

const Title = ({ queryTitle, onTitleChange }: PropsInput) =>
  <input value={queryTitle} onChange={(e) => onTitleChange(e.target.value)} />

export default Title
