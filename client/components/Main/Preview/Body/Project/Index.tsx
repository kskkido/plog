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

const mapStateToProps = (state: RootState) => ({
  mainKey: KEYS.PROJECT,
  navigation: state[KEYS.PROJECT]
})

export default connect<any, any, any>(mapStateToProps)(Preview)
