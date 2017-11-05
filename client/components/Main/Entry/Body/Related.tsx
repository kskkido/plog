import * as React from 'react'
import { connect } from 'react-redux'
import { selectRelatedArticle } from 'Reducer/selector'
import { RootState } from 'Reducer'
import { callLeft } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { flatMapIterable } from 'Util/generator'

interface PropState {
  articles: any
}

interface PropBase {
  article: any,
  children: any
}

interface Props extends PropState, PropBase {}

class LocalContainer extends React.Component<Props, {}> {
  render () {
    const { articles } = this.props
    return <div />
  }
}

const mapStateToProps = (state: RootState, props: PropBase): PropState => {
  const tags = props.article.tags.map(getProps('tagName'))
  const curried = callLeft(selectRelatedArticle, state)
  const articles = new Map(flatMapIterable(curried, tags))

  return {
    articles
  }
}

export default connect<any, any, any>(mapStateToProps)(LocalContainer)
