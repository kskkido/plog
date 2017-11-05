// generic parameters are used to define value types, not value itself
import { getKey } from 'Util/getter'
import { actionCreator, Action, Dispatch } from 'Util/reducer'

/* ========== ACTIONS ========== */
export interface SLIDE_VERTICAL {
  key: any
}

/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  slideVertical: actionCreator<SLIDE_VERTICAL>('SLIDE_VERTICAL')
}

/* ========== STATE ========== */
export interface State {
  key: string
}

export const initialState: State = {
  key: 'recent'
}

/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
  case actionCreators.slideVertical.type:
    const { key } = action.payload

    return {...state, key}

  default:
    return state
  }
}
