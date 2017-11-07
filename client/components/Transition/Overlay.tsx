import * as React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite } from 'gsap'
import { omit } from 'Util/converter'
import { Create } from 'Util/transition'
import { Animation as Fade } from './Fade'

const Animation = (() => {
  let enter
  let leave

  const onEnter = (target: any) => {
    enter = new TimelineLite()
    enter.add(Fade.onEnter(target), 0.5)

    return enter
      .to(target, 0.5, {
        height: '100vh',
        opacity: '0.7',
      }, 0.1)
  }

  const onExit = (target: any) => {
    leave = new TimelineLite()

    return leave
      .to(target, 0.4, {
        height: '0%',
        opacity: '0',
      }, 0.1)
  }

  return {
    onEnter,
    onExit
  }
})()


const Overlay = (props: any) => {

  return (
    <Transition
      {...props}
      timeout={{enter: 1100, exit: 500}}
      onEnter={Animation.onEnter}
      onExit={Animation.onExit}
    />
  )
}

export default Create(Overlay)
