import * as React from 'react'
import { connect } from 'react-redux'
import Preview from '../Preview'
import { RootState } from '../../../../../reducers'
import { KEYS } from '../../../../../data/key'

export interface PropState {
  navigation: any
}

export interface Props {
  inputRef?: Function
}

const Recent = (props: Props) => <Preview mainKey="recent" />

export default Recent
