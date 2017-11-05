import * as React from 'react'
import Fetch from 'HOC/Fetch'
import { identity } from 'Util/decorator'

const Branch = (test: Function, left: Function, right: Function = identity) => (Base: any) =>
  (props: object) => {
    const enhancer = test(props) ? left : right
    const Factory = React.createFactory(enhancer(Base))

    return (
      <Factory
        {...props}
      />
    )
  }

export default Branch
