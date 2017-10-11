import * as React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Main, Body, styleMap } from './Styles'
import Block from './Control/Block'
import Inline from './Control/Inline'
import Tag from './Tag'

export interface Props extends State {
  onChange: Function
}

export interface State {
  editorState: any
}

class LocalContainer extends React.Component<{}, State> {
  state: State = {
    editorState: EditorState.createEmpty()
  }

  handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onChange = (editorState: any) => {
    this.setState(() => ({editorState}))
  }

  onTab = (e: any) => {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  onToggle = (toggleFn: Function) =>
    (style: string) =>
      this.onChange(toggleFn(this.state.editorState, style))

  render () {
    console.log(this.state.editorState.getCurrentContent().getPlainText(), 'EDITOR STATE')

    return (
      <Main>
        <Tag />
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

export default LocalContainer
