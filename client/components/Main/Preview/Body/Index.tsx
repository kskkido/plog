import * as React from 'react'
import { connect } from 'react-redux'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, Power2 } from 'gsap'
import * as ScrollToPlugin from "gsap/ScrollToPlugin"
import { NAVIGATION } from 'Data'
import { actionCreators } from 'Reducer/main'
import { Dispatch } from 'Reducer/util'
import { Container, SubSection } from './Styles'
import { scrollController } from '../../../'
import Contact from './Contact'
import Preview from './Preview'

console.log(ScrollToPlugin)

export interface PropDispatch {
  slide: (key: string) => void
}

export interface Props extends PropDispatch {
}

export type componentList = any[]

const components: componentList = [
  () => <Preview mainKey="recent"/>,
  () => <Preview mainKey="article"/>,
  () => <Preview mainKey="project"/>,
  () => <Contact />,
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

  wrapList(list: componentList) {
    return list.map((factory, i) => {

      return (
        <SubSection key={i} innerRef={(el: any) => (this.divs[i] = el, this.addToScene(el, i))} >
          {factory()}
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
        {this.wrapList(components)}
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  slide: (key: string) => dispatch(actionCreators.slideVertical({key}))
})

export default connect<any, PropDispatch, any>(null, mapDispatchToProps)(LocalContainer)
