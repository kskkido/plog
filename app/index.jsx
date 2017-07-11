import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import Root from './components/Root'

export const history = createHistory()

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Root} />
		</Router>
	</Provider>,
	document.getElementById('main')
)
