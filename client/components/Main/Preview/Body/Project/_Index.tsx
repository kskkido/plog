import * as React from 'react'
import { connect } from 'react-redux'
import { SubContainer as Container } from '../Styles'
import Preview from '../Preview'
import { RootState } from '../../../../../reducers'
import { actionCreators } from '../../../../../reducers/main'
import { Dispatch } from '../../../../../reducers/util'
import { KEYS } from '../../../../../data/key'

export interface PropState {
  navigation: any
}

export interface Props {
  inputRef?: Function
}

const mapStateToProps = (state: RootState) => ({
  navigation: store.KEYS.PROJECT
})

export default connect<any, any, any>(Preview)
