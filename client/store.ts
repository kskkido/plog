import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const logMiddleware = (store: any) => (next: Function) => (action: any) => {
  return next(action)
}


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({ collapsed: true }),
      logMiddleware,
      thunkMiddleware
    )
  )
)

export default store


