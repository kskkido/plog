import * as React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Power2 } from 'gsap'
import { Create } from 'Util/transition'

export const Animation = (() => {

  const onEnter = (target: any) => {
    const children = target.getElementsByClassName('onEnter')
    const tl = new TimelineLite()

    return tl
      .staggerFrom(children, 0.6, {
        opacity: 0,
        y: '70px',
        clearProps: 'all'
      }, 0.2)
  }

  const onExit = (target: any) => {

  }

  return {
    onEnter,
    onExit,
  }
})()

const Fade = (props: any) => {

  return (
    <Transition
      {...props}
      appear={true}
      exit={false}
      timeout={800}
      onEnter={Animation.onEnter}
    />
  )
}

export default Create(Fade)
