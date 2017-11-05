import * as React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Main } from './Styles'

import Body from './Body'
import Branch from './Branch'
import Proxy from './Proxy'
import Side from './Side'

export type editorState = any
export type tags = Set<string>
export type title = string

export interface Props {
  content: any,
  status: boolean,
  tags: tags | null,
  title: title,
  onUpdate: Function,
}

export interface State {
  content: any,
  status: boolean,
  tags: tags,
  title: title,
  [type: string]: any
}

class LocalContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const {content, status, tags, title } = props

    this.state = {
      content: content ? EditorState.createWithContent(content) : EditorState.createEmpty(),
      status: status,
      tags: tags || new Set(),
      title: title
    }
  }

  componentWillUpdate(_: any, nextState: State) {
    this.onPost(nextState)
  }

  onPost = (state?: any) => this.props.onUpdate(state || this.state)

  onChange = (type: string) => (updateFn: any, cb?: Function) =>
    this.setState((state: State) => ({
        [type]: typeof updateFn === 'function' ?
          updateFn(state[type]) :
          updateFn
      }), () => cb && cb())

  onChangeContent = this.onChange('content')
  onChangeStatus = this.onChange('status')
  onChangeTag = this.onChange('tags')
  onChangeTitle = this.onChange('title')

  render () {
    const { content, status, tags, title } = this.state

    return (
      <Main>
        <Side
          status={status}
          tags={tags}
          title={title}
          onToggle={this.onChangeStatus}
          onTag={this.onChangeTag}
          onTitle={this.onChangeTitle}
          onPost={this.onPost}
        />
        <Body
          content={content}
          onChange={this.onChangeContent}
        />
      </Main>
    )
  }
}

export default Branch(Proxy(LocalContainer))
