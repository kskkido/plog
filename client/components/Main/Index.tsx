import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { Container } from './Styles'
import { fetchArticleTitle, fetchArticleTag, fetchTags } from '../../cms'

import Admin from './Admin'
import Search from './Search'
import Entry from './Entry/'
import Header from './Header'
import Overlay from './Overlay'
import Post from './Post'
import Preview from './Preview'

export interface Props {
  toggle: boolean,
  onToggleOn: Function,
  onToggleOff: Function
}

export interface State {
  toggle: boolean
}

const Main = (props: Props) => {
  const { toggle, onToggleOn, onToggleOff } = props

  return (
    <Container>
      {toggle && <Overlay onToggleOff={onToggleOff} />}
      <Header
        toggle={toggle}
        onToggleOn={onToggleOn}
        onToggleOff={onToggleOff}
      />
      <Route render={({ location }) => {
        return (
          <Switch location={location}>
            <Route path='/admin' component={Admin} />
            <Route path='/post/:id?' component={Post} />
            <Route path='/search' render={(props: any) => (
              <Search {...props} fetchMethod={fetchTags} />
            )} />
            <Route path='/entry/:id?' render={(props: any) => (
              <Entry {...props} fetchMethod={fetchArticleTitle} />
            )} />
            <Route exact path='/' component={Preview} />
          </Switch>
        )
      }}
      />
    </Container>
  )
}

class LocalContainer extends React.Component<{}, State> {
  state: State = {
    toggle: false
  }

  onChange = (toggle: boolean) => {
    this.setState(() => ({toggle}))
  }

  onToggleOn = () => {
    this.onChange(true)
  }

  onToggleOff = () => {
    this.onChange(false)
  }

  render () {
    const { toggle } = this.state

    return (
      <Main
        toggle={toggle}
        onToggleOn={this.onToggleOn}
        onToggleOff={this.onToggleOff}
      />
    )
  }
}

export default LocalContainer
