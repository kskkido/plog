import * as React from 'react'
import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
import globalStyle from './components/Styles/Global'
// import { Router, Route, Switch, Link } from 'react-router-dom'

injectGlobal`${globalStyle}`

export const App = () => (
  <BrowserRouter>
    <main>
      <Main fetched={false} />
    </main>
  </BrowserRouter>
)
