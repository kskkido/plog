import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { NavigationStore } from '../../../../data/store'

export interface Props {
  length?: number,
  targetKey?: string,
  [s: string]: any
}

export interface State {
  activeIndex: number
}

const Recent = () => (
  <div>
    Recent
    <Preview targetKey="RECENT" />
  </div>
)

export default Recent
