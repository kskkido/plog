import * as React from 'react'
import { compose } from 'Util/decorator'
import Branch from 'HOC/Branch'
import Async from './Async'
import Local from './Local'

const Factory = (test, asyncConfig, localConfig) => {
  const AsyncFetch = Async(asyncConfig)
  const LocalFetch = Local(localConfig)
  const Combine = Branch(// runs async fetch if our reducer does not have content of our interest
    (props: any) => test(props.payload),
    AsyncFetch
  )

  return compose(
    LocalFetch,
    Combine,
  ) // takes in component
}

export default Factory
