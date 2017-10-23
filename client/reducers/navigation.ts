import { actionCreator, Action, Dispatch, createInitialState, createReducers} from './util'
import { reducer as sublistReducer, State as SublistState } from './sublist'
import { navigation, NAVIGATION } from '../data'

export interface NAVIGATION_ACTION {
  key: string,
  index?: number,
  list?: any[]
}

export interface State {
  [key: string]: SublistState,
}

export const initialState = createInitialState(NAVIGATION)

export const SublistReducers =  createReducers<SublistState>(NAVIGATION, sublistReducer)

export const reducer = (state: State = initialState, action: Action<any>) => {
  const { payload, type } = action

  switch(type) {
  case 'SLIDE_HORIZONTAL':
  case 'APPEND_LIST':
  case 'NEW_LIST':
    const { key } = payload

    return {...state, [key]: SublistReducers(state[key], action)}

  default:
    return state
  }

}
