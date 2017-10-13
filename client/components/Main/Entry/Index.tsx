import * as React from 'react'
import { connect } from 'react-redux'
import { Body, Main } from './Styles'
import Factory from '../../HOC/Fetch'
import { toTitle } from '../../../cms/util'

import Content from './Content'
import Footer from './Footer'
import Side from './Side'

export interface Props {
  fetchMethod: Function,
  match?: any,
  location?: any
}

class LocalContainer extends React.Component<Props, {}> {
  fetchMethod: Function

  componentWillMount() {
    const { title } = this.props.match.params

    this.fetchMethod = () => this.props.fetchMethod(toTitle(title || 'Test_Article10'))
  }

  render() {

    return (
      <Main>
        <Side />
        <Body>
          <Content fetchMethod={this.fetchMethod} />
        </Body>
        <Footer />
      </Main>
    )
  }
}

export default LocalContainer
