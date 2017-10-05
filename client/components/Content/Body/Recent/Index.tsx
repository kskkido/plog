import * as React from 'react'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { NavigationStore } from '../../../../data/store'

const Recent = () => (
  <div>
    Recent
    <Preview mainKey="RECENT" />
  </div>
)

export default Recent
