import axios from 'axios'
import { Action, actionCreator, Dispatch, tap } from './util'

export const AUTHENTICATE = 'AUTHENTICATE'
export interface AUTHENTICATE_PAYLOAD {
  user: object | null
}

export const actionCreators = {
  authenticate: actionCreator<AUTHENTICATE_PAYLOAD>(AUTHENTICATE) // CALLED AFTER PRELOAD COMPLETES FETCHING FROM DATABASE
}

/* ========== STATE ========== */
export interface State {
  user: object | null
}

const initialState: State = {
  user: null
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
  case actionCreators.authenticate.type:
    return {...state, user: action.payload.user}

  default:
    return state
  }
}

/* ========== DISPATCHER ========== */
export const login = (email: string, password: string) => (dispatch: Dispatch) =>
  axios.post('/api/auth/login/local', {email, password}) // will login user through passport
    .then(() => dispatch(whoami())) // gets req.user assigned in passport
    .catch(() => dispatch(whoami())) // if login fails, req.user will be null

export const logout = () => (dispatch: Dispatch) =>
  axios.post('/api/auth/logout')
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))

export const whoami = () => (dispatch: Dispatch) =>
  axios.get('/api/auth/me')
    .then(res => {
      const user = res.data

      dispatch(actionCreators.authenticate({user}))
    })
    .catch(failed => dispatch(actionCreators.authenticate({user: null})))
