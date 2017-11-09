import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import rootReducer from 'Reducer'

const logMiddleware = (store: any) => (next: Function) => (action: any) => {
  if (action.type === 'FETCH_ARTICLE' && action.payload.type === 'SET') {
  }

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


