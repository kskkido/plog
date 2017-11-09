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
  const { activeIndex, length } = props
  const ratio = 100 / length

  return (
    <Container
      previewCount={length}
      ratio={ratio * activeIndex}
    >
      {props.children(ratio)}
    </Container>
  )
}

export default Slide
