import * as React from 'react'
import { connect } from 'react-redux'
import Preview from '../Preview'
import { RootState } from '../../../../../reducers'
import { KEYS } from '../../../../../data/key'

export interface Props {
  inputRef?: Function
}

const Project = (props: Props) => <Preview mainKey="project" />

export default Project
