// import * as React from 'react'
// import { mapValues } from './util'

// const WithHandler = (handlers: object) => (BaseComponent: any) => {
//   const factory = React.createFactory(BaseComponent)
//   class LocalContainer extends React.Component<any, null> {
//     handlers = mapValues(handlers, (curriedHandler, handlerName) => (...args) => {
//       const handler = curriedHandler(this.props)

//       return handler(...args)
//     })
//   }

//   render() {
//     return factory(
//       ...this.props,
//       ...this.handlers
//     )
//   }

//   return LocalContainer
// }

// export default LocalContainer
