import * as React from 'react'
import { connect } from 'react-redux'
import { TweenLite } from 'gsap'
import { Main } from './Styles'
import Factory from 'HOC/Fetch'
import { selectArticle, selectPublicArticle, selectRelevantTag } from 'Reducer/selector'
import { fetchArticles } from 'Util/server'
import Body from './Body'
import Side from './Side'

export interface PropState {
  articles: any,
  tags: any
}

export interface Props extends PropState {}

export interface State {
  queryTags: Set<string>,
  queryTitle: string
}

class LocalContainer extends React.Component<Props, State> {
  static scrollTop: Function = () => {
    const body = document.body

    TweenLite
      .to(body, 0.4, {
        scrollTop: 0,
      })
  }

  state: State = {
    queryTags: new Set(),
    queryTitle: ''
  }

  onChange = (type: string) => (updateFn: any) =>
    this.setState((state: State) => ({
      [type]: typeof updateFn === 'function' ?
        updateFn(state[type]) :
        updateFn
    }), () => LocalContainer.scrollTop())

  onTag = (tag: string) => {
    const { queryTags } = this.state

    queryTags.has(tag) && queryTags.delete(tag) || queryTags.add(tag)
    this.onChange('queryTags')(new Set(queryTags))
  }

  onTitle = this.onChange('queryTitle')

  render () {
    const { queryTags, queryTitle } = this.state
    const { articles, tags } = this.props

    return (
      <Main>
        <Side
          queryTags={queryTags}
          queryTitle={queryTitle}
          tags={tags}
          onTag={this.onTag}
          onTitle={this.onTitle}
        />
          <Body
            data={articles}
            query={{
              tags: Array.from(queryTags),
              title: queryTitle
            }}
          />
      </Main>
    )
  }
}

const mapStateToProps = (state: any): PropState => {
  const articleMap = selectPublicArticle(state)
  const tagMap = selectRelevantTag(state)

  return {
    articles: Array.from(articleMap.values()),
    tags: Array.from(tagMap.entries())
  }
}

export default connect<any, any, any>(mapStateToProps)(LocalContainer)
