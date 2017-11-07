import * as React from 'react'
import { compose } from 'Util/decorator'
import Branch from 'HOC/Branch'
import Async, { PreProps as AsyncConfig } from './Async'
import Local, { PreProps as LocalConfig } from './Local'

const Factory = (test: Function, asyncConfig: AsyncConfig, localConfig: LocalConfig) => {
  const AsyncFetch = Async(asyncConfig)
  const LocalFetch = Local(localConfig)
  const Combine = Branch( // runs async fetch if our local fetch can't find data of interest based on test parameter
    (props: any) => test(props.payload),
    AsyncFetch
  )

  return compose(
    LocalFetch,
    Combine,
  ) // takes in component
}

export default Factory
