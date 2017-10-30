import * as React from 'react'
import { connect } from 'react-redux'
import { Body, Main } from './Styles'
import Factory from '../../HOC/Fetch'
import { toTitle } from '../../../cms/util'
import { RootState } from '../../../reducers'
import { selectArticle } from '../../../reducers/selector'

import Content from './Content'
import Footer from './Footer'
import Side from './Side'

export interface PropState {
  article: any
}

export interface Props extends PropState {
  fetchMethod: Function,
  match?: any,
  location?: any
}

class LocalContainer extends React.Component<Props, {}> {
  render() {

    return (
      <Main>
        <Side />
        <Body>
          <Content article={this.props.article} />
        </Body>
        <Footer />
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState, props: Props) => {
  const articles = selectArticle(state),
        { id } = props.match.params

  return {
    article: articles.get(id)
  }
}

export default connect<any, any, any>(mapStateToProps)(LocalContainer)
