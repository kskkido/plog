// generic parameters are used to define value types, not value itself
import { Action, actionCreator } from './utils'

/* ========== ACTIONS ========== */
export const FETCH_COMPLETE = 'FETCH_COMPLETE'
export interface FETCH_COMPLETE_PAYLOAD {
  fetched: boolean
}


/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  fetchComplete: actionCreator<FETCH_COMPLETE_PAYLOAD>(FETCH_COMPLETE) // CALLED AFTER PRELOAD COMPLETES FETCHING FROM DATABASE
}


/* ========== STATE ========== */
export interface State {
  fetched: boolean
}

const initialState: State = {
  fetched: false
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
  case actionCreators.fetchComplete.type:
    return {...state, fetched: action.payload.fetched}

  default:
    return state
  }
}
