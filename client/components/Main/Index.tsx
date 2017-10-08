import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { Container } from './Styles'

import Preview, { Props } from './Preview'
import Entry from './Entry'
import Header from './Header'

const ContentRoute = (props: any) => (
  <Container>
    <Header />
    <Route render={({ location }) => {

      return (
        <Switch location={location}>
          <Route path='/post' component={Preview} />
          <Route path='/entry' render={(props: any) => (
            <Entry param={1} />
          )} />
          <Route exact path='/' render={(props: any) => (
            <Preview />
          )} />
        </Switch>
      )
    }}
    />
  </Container>
)

export default ContentRoute
