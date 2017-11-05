import * as React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import createImagePlugin from 'draft-js-image-plugin'
import { styleMap } from './config'
import { Body as Container } from '../Styles'

import Block from './Block'
import Inline from './Inline'

const imagePlugin = createImagePlugin()

export interface Props {
  content: any,
  onChange: Function
}

class LocalContainer extends React.Component<Props, {}> {

  handleKeyCommand = (command: any, content: any) => {
    const newState = RichUtils.handleKeyCommand(content, command)

    if (newState) {
      this.props.onChange(newState)
      return true
    }
    return false
  }

  onTab = (e: any) => {
    const maxDepth = 4

    this.props.onChange((content: any) => RichUtils.onTab(e, content, maxDepth))
  }

  onToggleStyle = (toggleFn: Function) => (style: string) =>
    this.props.onChange((content: any) =>
      toggleFn(content, style)
    )

  render () {
    const { content } = this.props

    return (
      <Container>
        <Block onToggle={this.onToggleStyle(RichUtils.toggleBlockType)} />
        <Inline onToggle={this.onToggleStyle(RichUtils.toggleInlineStyle)} />
        <Editor
          editorState={content}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.props.onChange}
          onTab={this.onTab}
          spellCheck={true}
          customStyleMap={styleMap}
          plugins={[imagePlugin]}
        />
      </Container>
    )
  }
}

export default LocalContainer
