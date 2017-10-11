import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { Container } from './Styles'
import { fetchArticleTitle, fetchArticleTag } from '../../cms'

import Preview, { Props } from './Preview'
import Entry from './Entry'
import Header from './Header'
import Post from './Post'

const ContentRoute = (props: any) => (
  <Container>
    <Header />
    <Route render={({ location }) => {
      return (
        <Switch location={location}>
          <Route path='/post' component={Post} />
          <Route path='/entry/:title?' render={(props: any) => (
            <Entry {...props} fetchMethod={fetchArticleTitle} />
          )} />
          <Route exact path='/' component={Preview} />
        </Switch>
      )
    }}
    />
  </Container>
)

export default ContentRoute
