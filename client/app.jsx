import React from 'react'
import Main from './Components/Main'
import { BrowserRouter } from 'react-router-dom'
// import { Router, Route, Switch, Link } from 'react-router-dom'

export const App = () => (
  <BrowserRouter>
    <main>
      <Main />
    </main>
  </BrowserRouter>
)
