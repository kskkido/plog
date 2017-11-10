import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TweenLite } from 'gsap'
import Admin from './Admin'
import Search from './Search'
import Entry from './Entry/'
import Post from './Post'
import Preview from './Preview'

const scrollTop: Function = () => {
  document.body.scrollTop = 0

  // TweenLite
  //   .to(body, 0.4, {
  //     scrollTop: 0,
  //   })
}

const Routes = () => (
  <Route render={({ location }) => {
      scrollTop()

      return (
        <Switch location={location}>
          <Route
            path='/admin'
            component={Admin}
          />
          <Route
            path='/post/:id?'
            component={Post}
          />
          <Route
            key={location.key}
            path='/entry/:id'
            component={Entry}
          />
          <Route
            path='/entry'
            render={(props: any) => <Search {...props} />}
          />
          <Route
            exact path='/'
            component={Preview}
          />
        </Switch>
      )}
    }
  />
)

export default Routes
