import * as React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Main, Body, styleMap } from './Styles'

import Block from './Control/Block'
import Inline from './Control/Inline'
import Proxy from './Proxy'
import Side from './Side'

export type editorState = any
export type tagList = Set<string>
export type title = string

export interface Props {
  editorState: editorState | null,
  tagList: tagList | null,
  title: title,
  cacheArticle: Function,
  publishArticle: Function,
}

export interface State {
  editorState: editorState,
  tagList: tagList,
  title: title
}

class LocalContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const {editorState, tagList, title } = props

    this.state = {
      editorState: editorState ? EditorState.createWithContent(editorState) : EditorState.createEmpty(),
      tagList: tagList || new Set(),
      title: title
    }
  }

  handleKeyCommand = (command: any, editorState: editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  setStateWrapper = (type: string, payload: any, cb?: Function) =>
    this.setState(() => ({[type]: payload}), () => cb && cb())

  onChange = this.props.cacheArticle(this.setStateWrapper, 'editorState')
  onChangeTag = this.props.cacheArticle(this.setStateWrapper, 'tagList') // caches changes while updating editor state or taglist
  onChangeTitle = this.props.cacheArticle(this.setStateWrapper, 'title')

  _onTagRemove = (cb: Function | undefined) => (tagName: string) => {
    const { tagList } = this.state

    tagList.delete(tagName) && this.onChangeTag(tagList, cb)
  }
  _onTagAdd = (cb: Function | undefined) => (tagName: string) => {
    const tagList = new Set(this.state.tagList.add(tagName))

    this.onChangeTag(tagList, cb)
  }

  onTitle = (title) => {
    this.onChangeTitle(title)
  }

  onTab = (e: any) => {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }
  onToggle = (toggleFn: Function) =>
    (style: string) =>
      this.onChange(toggleFn(this.state.editorState, style))

  onSubmit = (e: any) => {
    const { editorState, tagList, title } = this.state

    this.props.publishArticle({editorState, title, tagList}) // do something
  }

  render () {


    return (
      <Main>
        <Side
          tagList={this.state.tagList}
          title={this.state.title}
          onSubmit={this.onSubmit}
          onTitle={this.onTitle}
          _onTagAdd={this._onTagAdd}
          _onTagRemove={this._onTagRemove}
        />
        <Body>
          <Block onToggle={this.onToggle(RichUtils.toggleBlockType)} />
          <Inline onToggle={this.onToggle(RichUtils.toggleInlineStyle)} />
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            spellCheck={true}
          />
        </Body>
      </Main>
    )
  }
}

export default Proxy(LocalContainer)
