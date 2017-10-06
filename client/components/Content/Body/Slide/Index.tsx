import * as React from 'react'
import { TweenMax } from 'gsap'
import { SlideContainer as Container } from './Styles'
import { NavigationStore } from '../../../../data/store'
import Preview from '../Preview/Card'

export interface Props {
  length: number,
  activeIndex: number,
  inputRef?: Function,
  children?: Function
}

const Slide = (props: Props) => {
  const ratio = 100 / props.length

  return (
    <Container
      previewCount={props.length}
      ratio={ratio * props.activeIndex}
      innerRef={(el: any) => props.inputRef && props.inputRef(el)}
    >
      {props.children && props.children(ratio)}
    </Container>
  )
}

export default Slide
