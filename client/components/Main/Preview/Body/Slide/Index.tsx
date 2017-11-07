import * as React from 'react'
import { TweenMax } from 'gsap'
import { SlideContainer as Container } from './Styles'
import Preview from '../Preview/Card'

export interface Props {
  length: number,
  activeIndex: number,
  children: Function
}

const Slide = (props: Props) => {
  const ratio = 100 / props.length

  return (
    <Container
      previewCount={props.length}
      ratio={ratio * props.activeIndex}
    >
      {props.children(ratio)}
    </Container>
  )
}

export default Slide
