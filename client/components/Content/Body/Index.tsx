import * as React from 'react'
import { Container } from './Styles'

import Article from './Article'
import Contact from './Contact'
import Project from './Project'
import Recent from './Recent'


const Body = () => (
  <Container>
    <Recent />
    <Article />
    <Project />
    <Contact />
  </Container>
)

export default Body
