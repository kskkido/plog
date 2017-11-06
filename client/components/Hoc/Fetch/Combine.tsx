import * as React from 'react'
import { compose } from 'Util/decorator'
import Branch from 'HOC/Branch'
import Async from './Async'
import Local from './Local'

const Factory = (test, asyncConfig, localConfig) => {
  const AsyncBranch = Async(asyncConfig)
  const LocalBranch = Local(localConfig)
  const Combine = Branch(
    test,
    AsyncBranch
  )

  return compose(
    LocalBranch,
    Combine,
  ) // takes in component
}

export default Factory
