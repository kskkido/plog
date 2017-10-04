import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Main } from './Styles'

import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import Side from './Side'

const Content = () => (
  <Container>
    <Header />
    <Main>
      <Side />
      <Body />
    </Main>
    <Footer />
  </Container>
)

export default Content
