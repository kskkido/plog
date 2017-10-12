import { TimelineLite, Back } from 'gsap'

export const onHoverShape = (svg: any) => {
  const tl = new TimelineLite({paused: true})
    .to(svg, 0.3, {
      scale: 1.1,
      fill: '#00E676'
    })

  return tl
}

export const onToggleShape = (svg: any) => {
  const childNodes = svg.childNodes
  const tl = new TimelineLite({paused: true})
    .to(childNodes[0], 0.15, {
      y: '+=13'
    })
    .to(childNodes[2], 0.15, {
      y: '-=13',
    }, '-=0.15')
    .to(childNodes[1], .15, {
      opacity: 0
    })
    .to(childNodes[0], 0.15, {
      rotation: 45,
      transformOrigin: 'center',
      ease: Back.easeOut
    })
    .to(childNodes[2], 0.15, {
      rotation: -45,
      transformOrigin: 'center',
      ease: Back.easeOut
    }, '-=0.15')

  return tl
}

export const onToggleOnCallback = () => () => {}

export const onToggleOffCallback = () => () => {}
