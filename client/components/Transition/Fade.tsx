import * as React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Power2 } from 'gsap'
import { Create } from 'Util/transition'

export const Animation = (() => {

  const onEnter = (delay: number = 0) => (target: any) => {
    const children = target.getElementsByClassName('onEnter')
    const tl = new TimelineLite()
      .delay(delay)

    return tl
      .staggerFrom(children, 0.5, {
        opacity: 0,
        y: '70px',
        clearProps: 'all'
      }, 0.1)
  }

  const onExit = (target: any) => {

  }

  return {
    onEnter,
    onExit,
  }
})()

const Fade = (props: any) => {
  const delay = props.delay || 0

  return (
    <Transition
      {...props}
      appear={true}
      exit={false}
      timeout={600 + (delay * 1000)}
      onEnter={Animation.onEnter(delay)}
    />
  )
}

export default Create(Fade)
