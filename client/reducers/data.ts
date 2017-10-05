// generic parameters are used to define value types, not value itself
import { Action, actionCreator, getKey } from './utils'
import { NAVIGATION, navigation } from '../data'

/* ========== ACTIONS ========== */
export interface SLIDE_HORIZONTAL {
  key: string,
  index: number,
}

export interface SLIDE_VERTICAL {
  key: string,
}


/* ========== ACTION CREATORS ========== */
export const actionCreators = {
  slideHorizontal: actionCreator<SLIDE_HORIZONTAL>('SLIDE_HORIZONTAL'), // CALLED AFTER PRELOAD COMPLETES FETCHING FROM DATABASE
  slideVertical: actionCreator<SLIDE_VERTICAL>('SLIDE_VERTICAL')
}


/* ========== STATE ========== */
export interface State {
  current: string,
  navigation: navigation
}

const initialState: State = {
  current: 'RECENT',
  navigation: NAVIGATION
}


/* ========== ACTIONS ========== */
export const reducer = (state: State = initialState, action: Action<any>): State => {
  switch (action.type) {
  case actionCreators.slideHorizontal.type:
    const {key, index} = action.payload,
          copy = new Map(state.navigation),
          keyData = getKey(key, copy)

    keyData.activeIndex = index
    return {...state, navigation: copy}

  case actionCreators.slideVertical.type:
    return {...state, current: action.payload.key}

  default:
    return state
  }
}
