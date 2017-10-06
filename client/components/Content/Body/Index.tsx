import * as React from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax } from 'gsap'
import * as ScrollToPlugin from "gsap/ScrollToPlugin"
import { Container } from './Styles'
import { MAIN_HEIGHT } from '../Styles'
import { scrollController } from '../../Main'
import { NavigationStore } from '../../../data/store'

import Article from './Article'
import Contact from './Contact'
import Project from './Project'
import Recent from './Recent'

export interface Props {
  onMainListener: Function
}

export type componentList = any[]

const components: componentList = [
  Recent,
  Article,
  Project,
  Contact,
]

const keyList: any[] = NavigationStore.getKey()
console.log(ScrollToPlugin)
class LocalContainer extends React.Component<Props, any> {
  divs: any[] = []

  constructor (props: Props) {
    super(props)

    this.addToScene = this.addToScene.bind(this)
  }

  componentDidMount() {
    this.addScrollTo(this.divs)
  }

  shouldComponentUpdate() {
    return false
  }

  wrapChildren(list: componentList) {
    return list.map((Component, i) => {

      return (
        <div key={i} ref={(el: any) => (this.divs[i] = el, this.addToScene(el, i))} >
          <Component />
        </div>
      )
    })
  }

  addToScene(el: any, i: number) {
    new ScrollMagic.Scene({
        triggerElement: el,
        offset: -70,
        duration: 100,
      })
      .on('start', () => TweenMax.isTweening(window) || this.props.onMainListener(keyList[i]))
      .addTo(scrollController)
  }

  addScrollTo(refList: any[]) {
    scrollController.scrollTo(function(i: number) {
      TweenMax.to(window, 0.5, {scrollTo: {y: refList[i], offsetY: 70}})
    })
  }

  render() {

    return (
      <Container>
        {this.wrapChildren(components)}
      </Container>
    )
  }
}

export default LocalContainer
