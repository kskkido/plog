// import * as React from 'react'

// export interface Props {
//   children: any,
//   scrollCallback?: Function,
// }

// export interface State {
//   rendered: boolean
// }

// const Factory = (Base: any) =>
//   class LocalContainer extends React.Component<Props, State> {
//     state = {
//       rendered: false
//     }

//     componentDidMount() {
//       window.addEventListener('scroll', this.handleScroll)
//     }

//     componentWillUnmount() {
//       window.removeEventListener('scroll', this.handleScroll)
//     }

//     onRender(cb?: Function) {
//       this.setState(() => ({rendered: true}), () => cb && cb())
//     }

//     handleScroll = (e: any) => {
//       const { top } = this.getRect()
//       if (top < 20) {
//         console.log('hit', top)
//         this.onRender(this.props.callback)
//       }
//     }

//     getRect = () => {
//       return this.content.getBoundingClientRect()
//     }

//     render() {
//       const { children } = this.props

//       return (
//         <div
//           ref={(div: any) => this.content = div}

//         >
//           <Base
//             {...this.props}
//           />
//         </div>
//       )
//     }
//   }

// export default Factory
