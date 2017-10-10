import * as React from 'react'
import { connect } from 'react-redux'
import { Body, EntryContainer, Main } from './Styles'
import { toTitle } from '../../../cms/util'
import { DICTIONARY } from '../../../data/dictionary'
import { RootState } from '../../../reducers'

import Footer from './Footer'
import Side from './Side'

export type entry = { //
  title: string,
  content: string,
  date?: string,
  media?: string,
}

export interface Props {
  fetchMethod: Function,
  match?: any,
  location?: any
}

export interface State {
  data: entry | null
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    data: null
  }

  componentWillMount() {
    const { title } = this.props.match.params

    this.props.fetchMethod(toTitle(title || 'Test_Article10'))
      .then((res: any) => this.setState(() => ({data: res.data})))
      .catch(console.error)
  }

  render() {
    const { data } = this.state

    if (data === null) {
      return <span>not ready</span>
    }

    return (
      <Main>
        <Side />
        <Body>
          <EntryContainer>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
          </EntryContainer>
        </Body>
        <Footer />
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState): void => {}

export default LocalContainer
