import * as React from 'react'
import { Container } from './Styles'
import { createTree, identity, safeCurry, unaryCompose } from './util'

/*
  INTERFACE

  Animations:
  -> clicked animation
  -> unclicked animation
    -> fires click animation, which depends on toggle state
  -> hover animation
  toggles state on click
*/

export interface timeline {
  play: Function,
  reverse: Function,
}

const noopTimeline = {
  play: identity,
  reverse: identity
}

export interface Props {
  toggle?: boolean,
  onChange?: Function,
  onHoverShape?: Function,
  onToggleShape?: Function,
  onToggleOnCallback?: Function, // manipulates environment, ie: sliding up overlay
  onToggleOffCallback?: Function,
}

export interface State {
}

const Factory = (SVG: any) => {

  class LocalContainer extends React.Component<Props, State> {
    onHoverShape: timeline
    onToggleShape: timeline
    onToggleCallback: Function
    svg: any

    componentDidMount() {
      const { onHoverShape, onToggleShape, onToggleOnCallback, onToggleOffCallback } = this.props

      this.onHoverShape = safeCurry(onHoverShape, noopTimeline)(this.svg)
      this.onToggleShape = safeCurry(onToggleShape, noopTimeline)(this.svg)
      this.onToggleCallback = createTree(
        unaryCompose((_: any) => this.onToggleShape.reverse(), onToggleOffCallback), // callback when button turns inactive
        unaryCompose((_: any) => this.onToggleShape.play(), onToggleOnCallback) // callback when button turns active
      )
    }

    componentWillReceiveProps (props: Props) {
      this.onToggleCallback(props.toggle)
    }

    onClick = () => {
      const { toggle, onChange } = this.props

      onChange && onChange(toggle)
    }

    onHoverOn = () => {
      this.onHoverShape.play()
    }

    onHoverOff = () => {
      this.onHoverShape.reverse()
    }

    render () {

      return (
        <Container
          onClick={() => this.onClick()}
          onMouseOver={() => this.onHoverOn()}
          onMouseOut={() => this.onHoverOff()}
        >
          <SVG innerRef={(el: any) => this.svg = el} />
        </Container>
      )
    }
  }

  return LocalContainer
}

export default Factory
