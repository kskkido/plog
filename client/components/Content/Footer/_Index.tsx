// import * as React from 'react'
// import { Container } from './Styles'
// import { NavigationStore } from '../../../data/store'
// import Navigation from './Navigation'

// export interface Props {
//   [s: string]: any
// }

// export interface State {
//   activeIndex: number,
//   mainKey: string
// }

// export interface unsubscribe {
//   onList: Function,
//   onMain: Function
// }

// class LocalContainer extends React.Component<Props, State> {
//   state: State = {
//     activeIndex: 0,
//     mainKey: 'RECENT'
//   }
//   childList: string[]
//   onListListener: Function
//   onMainListener: Function
//   unsubscribe: unsubscribe = {
//     onList: () => {},
//     onMain: () => {}
//   }

//   constructor(props: Props) {
//     super(props)

//     this.handleClick = this.handleClick.bind(this)
//     this.setStateWrapper = this.setStateWrapper.bind(this)
//   }

//   componentWillMount() {
//     this.onListListener = this.setStateWrapper('activeIndex'),
//     this.onMainListener = this.setStateWrapper('mainKey', this.handleMainChange)

//     this.unsubscribe.onList = NavigationStore.subscribe('RECENT', this.onListListener))
//     this.unsubscribe.onMain = NavigationStore.subscribe('MAIN', this.onMainListener))

//     this.childList = NavigationStore.getSublist('RECENT')
//   }

//   componentWillUnmount() {
//     this.unsubscribe.forEach(fn => fn())
//   }

//   setStateWrapper(property: string, cb?: Function) {
//     return (payload) => this.setState({[property]: payload}, cb && cb(payload))
//   }

//   handleMainChange (newKey) {
//     this.onListListener(NavigationStore.getIndex(newKey))
//     this.unsubscribe.onList()
//     this.unsubscribe.onList = NavigationStore.subscribe(newKey, this.onListListener)
//   }

//   handleClick(i: number) {
//     NavigationStore.setIndex('RECENT', i)
//   }

//   render() {

//     return (
//       <Container>
//         <Navigation
//           activeIndex={this.state.activeIndex}
//           list={this.childList}
//           onClickHandler={this.handleClick}
//         />
//       </Container>
//     )
//   }
// }

// export default LocalContainer
