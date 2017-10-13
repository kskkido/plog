import * as React from 'react'
import { Body, Main } from './Styles'
import { fetchArticles } from '../../../cms'
import Content from './Content'
import Side from './Side'
// infinite scroller
// initialize with x amount of articles
// hit an y point in page scroll, load next x amount of articles
// side component will have search queries

export interface Props {

}

export interface State {
  title: string,
  tags: Set<string>
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    title: '',
    tags: new Set()
  }

  isEmpty = () => {
    const { title, tags } = this.state

    return !title && tags.size === 0
  }

  onChange = (type: string, query: any) => {
    this.setState(() => ({[type]: query}))
  }

  onTitle = (title: string) => {
    this.onChange('title', title)
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
    const fetchMethod = this.isEmpty() ? fetchArticles : fetchArticles

    return (
      <Main>
        <Side />
        <Body>
          <Content fetchMethod={fetchMethod} />
        </Body>
      </Main>
    )
  }
}

export default LocalContainer
