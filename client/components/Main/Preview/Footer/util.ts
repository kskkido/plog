import { TweenLite } from 'gsap'

export const slide = (target: any, i: number) =>
  TweenLite.to(target, 0.3, {
    x: `${i * 100}%`
  })
