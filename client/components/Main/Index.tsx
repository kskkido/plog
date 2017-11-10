import * as React from 'react'
// import { TransitionGroup } from 'react-transition-group'
import { Container } from './Styles'
import Header from './Header'
import Routes from './Routes'

const Main = (props: any) => {

  return (
    <Container id={"main"}>
      <Header />
      <Routes />
    </Container>
  )
}

export default Main
