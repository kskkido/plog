import * as React from 'react'
import { Body, Main } from './Styles'
import Factory from '../../HOC/Fetch'
import { fetchArticles } from '../../../cms'
import Content from './Content'
import Side from './Side'
// infinite scroller
// initialize with x amount of articles
// hit an y point in page scroll, load next x amount of articles
// side component will have search queries

export type title = string
export type tags = any

export interface Props {
  payload: any
}

export interface State {
  tags: tags
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    tags: new Set()
  }

  isEmpty = () => {
    const { tags } = this.state

    return tags.size === 0
  }

  onChange = (type: string, query: any) => {
    this.setState(() => ({[type]: query}))
  }

  onTagAdd = (tag: string) => {
    const { tags } = this.state

    tags.has(tag) || this.onChange('tags', new Set(tags.add(tag)))
  }

  onTagRemove = (tag: string) => {
    const { tags } = this.state

    tags.delete(tag) && this.onChange('tags', new Set(tags))
  }

  render () {
    const { payload } = this.props
    const fetchMethod = this.isEmpty() ? fetchArticles : fetchArticles

    return (
      <Main>
        <Side
          tags={payload}
          onTagAdd={this.onTagAdd}
          onTagRemove={this.onTagRemove}
        />
        <Body>
          <Content fetchMethod={fetchMethod} />
        </Body>
      </Main>
    )
  }
}

export default Factory(LocalContainer)
