// // generic parameters are used to define value types, not value itself
// import { Action, actionCreator, Dispatch, getKey } from './util'
// import { NAVIGATION, navigation } from '../data'

// /* ========== ACTIONS ========== */
// export interface FETCH_DICTIONARY {
//   key: string, // append to this key
//   payload: any
// }

// /* ========== ACTION CREATORS ========== */
// export const actionCreators = {
//   fetchDictionary: actionCreator<FETCH_DICTIONARY>('FETCH_DICTIONARY')
// }


// /* ========== STATE ========== */
// export interface State {
//   dictionary: Map<string, array>
// }

// export const initialState: State = {
//   dictionary: new Map()
// }


// /* ========== ACTIONS ========== */
// export const reducer = (state: State = initialState, action: Action<any>): State => {
//   switch (action.type) {
//   case actionCreators.fetchDictionary.type:
//     const {key, payload} = action.payload,
//           newDict = new Map(state.dictionary.entries())

//     newDict.has(key) || newDict.set(key, [])
//     newDict.set(key, newDict.get(key).concat(payload))
//     return {...state, dictionary: newDict}

//   default:
//     return state
//   }
// }

// export const addToDictionary = (fetchMethod: function, type: string = 'tag') => (dispatch: Dispatch) =>
//   fetchMethod(...args)
//     .then((res) => {
//       const payload = {
//         type,
//         payload: res.data
//       }

//       dispatch(actionCreators.fetchDictionary(payload))
//     })
//     .catch(console.error)
