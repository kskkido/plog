/* ====== DEFINE ACTION TYPES ====== */
const AUTHENTICATE = 'AUTHENTICATE'

/* ====== DEFINE ACTION CREATORS ====== */
export const authenticate = () => ({type: AUTHENTICATE})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  authenticated: false
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE:
    return Object.assign({}, state, {authenticated: true})

  default:
    return state
  }
}

/* ====== DEFINE DISPATCHERS ====== */
