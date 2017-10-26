import * as React from 'react'
import { connect } from 'react-redux'
import { Body, Main, Side } from './Styles'
import Factory from '../../HOC/Fetch'
import { fetchArticles } from '../../../cms'
import { selectArticle, selectTag } from '../../../reducers/selector'
import Content from './Content'
import { Tags, Title} from './Query/'
// infinite scroller
// initialize with x amount of articles
// hit an y point in page scroll, load next x amount of articles
// side component will have search queries

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
  static scrollTop: Function = () => window.scrollTo(0, 0)

  state: State = {
    queryTags: new Set(),
    queryTitle: ''
  }

  onChange = (type: string, query: any) => this.setState(() => ({[type]: query}), () => LocalContainer.scrollTop())

  onTitleChange = (title: string) => this.onChange('queryTitle', title)

  onTagClick = (tag: string) => {
    const { queryTags } = this.state

    queryTags.has(tag) && queryTags.delete(tag) || queryTags.add(tag)
    this.onChange('queryTags', new Set(queryTags))
  }

  render () {
    const { queryTags, queryTitle } = this.state
    const { articles, tags } = this.props

    return (
      <Main>
        <Side>
          <Title
            queryTitle={queryTitle}
            onTitleChange={this.onTitleChange}
          />
          <Tags
            tags={tags}
            queryTags={queryTags}
            onTagClick={this.onTagClick}
          />
        </Side>
        <Body>
          <Content
            articles={articles}
            query={{
              tags: Array.from(queryTags),
              title: queryTitle
            }}
          />
        </Body>
      </Main>
    )
  }
}

const mapStateToProps = (state: any): PropState => ({
    articles: Array.from(selectArticle(state).values()),
    tags: Array.from(selectTag(state).entries())
  })

export default connect<any, any, any>(mapStateToProps)(LocalContainer)
