import * as React from 'react'
import { connect } from 'react-redux'
import { Main } from '../Styles'
import { RootState } from '../../../reducers'
import { fetchArticle } from '../../../cms/local'

export type entry = { //
  header: string,
  content: string,
  date?: string,
  media?: string
}

export interface Props {
  param: string | number
}

export interface State {
  ready: boolean,
  data: entry | null
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    ready: false,
    data: null
  }

  componentWillMount() {
    fetchArticle(this.props.param)
      .then(data => this.setState(() => ({ready: true, data})))
  }

  render() {
    console.log(this.props)
    // if (!this.state.ready) {
    //   return <span>not ready</span>
    // }

    return (
      <Main>
        <span>ready</span>
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState): void => {}

export default LocalContainer
