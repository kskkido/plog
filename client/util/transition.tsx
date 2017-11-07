import * as React from 'react'
import { omit } from 'Util/converter'

export const Create = (Transition: any) => (config: object = {}) => (Base: any) => (props: any) => (
  <Transition
    {...config}
    in={props.in !== undefined ? props.in : true}
  >
    <Base {...omit(props, ['in'])} />
  </Transition>
)
