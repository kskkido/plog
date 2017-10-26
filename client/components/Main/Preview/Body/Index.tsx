import * as React from 'react'
import { connect } from 'react-redux'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, Power2 } from 'gsap'
import * as ScrollToPlugin from "gsap/ScrollToPlugin"
import { Container, SubSection } from './Styles'
import { scrollController } from '../../../'
import { actionCreators } from '../../../../reducers/main'
import { Dispatch } from '../../../../reducers/util'
import { NAVIGATION } from '../../../../data'
import Article from './Article'
import Contact from './Contact'
import Project from './Project'
import Recent from './Recent'

console.log(ScrollToPlugin)

export interface PropDispatch {
  slide: (key: string) => void
}

export interface Props extends PropDispatch {
}

export type componentList = any[]

const components: componentList = [
  Recent,
  Article,
  Project,
  Contact,
]

class LocalContainer extends React.Component<Props, any> {
  keyList: any[] = Array.from(NAVIGATION.keys())
  divs: any[] = []
  scenes: any[] = []

  constructor (props: Props) {
    super(props)

    this.addToScene = this.addToScene.bind(this)
  }

  componentDidMount() {
    this.addScrollTo(this.divs)
  }

  componentWillUnmount() {
    this.scenes.forEach((scene) => scene.off('enter', () => console.log('removed items')))
    scrollController.removeScene(this.scenes)
  }

  wrapChildren(list: componentList) {
    return list.map((Component, i) => {

      return (
        <SubSection key={i} innerRef={(el: any) => (this.divs[i] = el, this.addToScene(el, i))} >
          <Component />
        </SubSection>
      )
    })
  }

  addToScene(el: any, i: number) {
    const scene = new ScrollMagic.Scene({
        triggerElement: el,
        duration: 100,
      })
      .on('enter', () => TweenMax.isTweening(window) || this.props.slide(this.keyList[i]))
      .addTo(scrollController)

    this.scenes.push(scene)
  }

  addScrollTo(refList: any[]) {
    scrollController.scrollTo(function(i: number) {
      TweenMax.to(window, 0.5, {
        scrollTo: {y: refList[i], offsetY: 90},
        ease: Power2.easeIn
      })
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  slide: (key: string) => dispatch(actionCreators.slideVertical({key}))
})

export default connect<any, PropDispatch, any>(null, mapDispatchToProps)(LocalContainer)
