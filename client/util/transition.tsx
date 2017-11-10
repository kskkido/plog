import * as React from 'react'
import { omit } from 'Util/converter'

// util to convert transition components into higher order components that take in configuration
// use for all transition components
export const Create = (Transition: any) => (config: object = {}) => (Base: any) => (props: any) => (
  <Transition
    {...config}
    in={props.in !== undefined ? props.in : true} // defaults to true if 'in' is not specified as a prop
  >
    <Base {...omit(props, ['in'])} />
  </Transition>
)

interface ScrollProps {
  callback?: Function
  targetY?: number
}

interface ScrollState {
  rendered: boolean
}

// util to trigger { in } for transition in response to scroll
export const Scroll = (WithTransition: any) =>
  class LocalContainer extends React.Component<Props, State> {
    state: State = {
      rendered: false
    }

    componentDidMount() {
      const { targetY } = this.props

      this.targetY = targetY === undefined ? this.getDefaultTargetY() : targetY //cache targetY
      this.listen()
      this.handleScroll()
    }

    componentWillUnmount() {
      this.unListen()
    }

    onIn = (cb?: Function) => {
      this.setState(
        () => ({rendered: true}),
        () => {
          this.unListen()
          cb && cb()
        })
    }

    listen = () =>  {
      window.addEventListener('scroll', this.handleScroll)
    }

    unListen = () => {
      window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (e: any) => {
      const { top } = this.getRect()
      const { callback } = this.props

      if (top < this.targetY) {
        this.onIn(callback)
      }
    }

    getRect = () => {
      return this.content.getBoundingClientRect()
    }

    getDefaultTargetY = () => {
      const y = document.documentElement.clientHeight

      return y * 1.05
    }

    render() {
      const { rendered } = this.state

      return (
        <div ref={(div: any) => this.content = div}>
          <WithTransition
            in={rendered}
            {...this.props}
          />
        </div>
      )
    }
  }
