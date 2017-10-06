import * as React from 'react'
import * as ScrollMagic from 'scrollmagic'
import { Container } from './Styles'
import { scrollController } from '../../Main'
import { NavigationStore } from '../../../data/store'

import Article from './Article'
import Contact from './Contact'
import Project from './Project'
import Recent from './Recent'

export type componentList = any[]

const components: componentList = [
  Recent,
  Article,
  Project,
  Contact,
]

const keyList: any[] = NavigationStore.getKey()

class LocalContainer extends React.Component<any, any> {
  divs: any[] = []

  componentDidMount() {
    console.log(scrollController, this.divs)
  }

  shouldComponentUpdate() {
    return false
  }

  wrapChildren(list: componentList) {
    return list.map((Component, i) => {

      return (
        <div key={i} ref={(el: any) => (this.divs[i] = el, this.addToScene(el, i))}>
          <Component />
        </div>
      )
    })
  }

  addToScene(el: any, i: number) {
    new ScrollMagic.Scene({
        triggerElement: el,
        offset: -100,
        duration: 100,
      })
      .triggerHook(0.75)
      .on('start', () => NavigationStore.dispatch('MAIN', keyList[i]))
      .addTo(scrollController)
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
