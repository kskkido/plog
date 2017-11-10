import { DICTIONARY_ACTION } from './'
import { compose, identity } from 'Util/decorator'
import { Dispatch } from 'Util/Reducer'

class DictionaryDispatch {
  constructor(actionCreator: Function, middlewares: Function[] = []) {

    this.create = (action) => (dispatch: Dispatch, getState: Function) => {
      let middleware = identity

      if (middlewares.length > 0) {
        const curried = middlewares.map((fn: Function) => fn(dispatch, getState))
        middleware = compose(...curried)
      }

      return action instanceof Promise ?
        action.then((res: DICTIONARY_ACTION) => dispatch(actionCreator(middleware(res)))) :
        dispatch(actionCreator(middleware(action)))
    }
  }

  static createMapAction = (payload: any, _key: string, type: string): DICTIONARY_ACTION => {
    const key = _key instanceof Function ? _key(payload) : _key
    const entry: entry = {data: payload, local: true, url: `/entry/${key}`}

    return { payload: entry, type, key }
  }

  static dictionaryActionCreator = (fetchMethod: any, key: string, type: string) =>
    fetchMethod instanceof Promise ?
      fetchMethod.then((res: any) => DictionaryDispatch.createMapAction(res.data, key, type)) :
      DictionaryDispatch.createMapAction(fetchMethod, key, type)

  set = (key: Function | String, fetchMethod: Function | Object) =>
    this.create(DictionaryDispatch.dictionaryActionCreator(fetchMethod, key, 'SET'))

  delete = (key: String) =>
    this.create(DictionaryDispatch.dictionaryActionCreator(null, key, 'DELETE'))
}

export default DictionaryDispatch
