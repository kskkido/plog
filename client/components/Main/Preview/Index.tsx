import * as React from 'react'
import { connect } from 'react-redux'
import { Main } from './Styles'

import Body from './Body'
import Footer from './Footer'
import Route from './Route'
import Side from './Side'

export interface Props {
}

const Content = (props: Props) => (
  <div>
    <Main>
      <Side/>
      <Body />
    </Main>
    <Footer/>
  </div>
)

export default Content
