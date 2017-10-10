import axios from 'axios'
import { FETCH_COMPLETE } from '../reducers/fetch'

export const API_BASE_URL = 'https://cdn.contentful.com'
export const API_SPACE_ID = '8aq97bb1wyrq'
export const API_TOKEN = 'eafbfa1e1cea94809fc29b57d30b997d886606082f317fb9f95176498cbb0e8e'

export const cmsAxios = axios.create({
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  },
  responseType: 'json'
})

export const fetchEntries = () => {
  const request = cmsAxios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?content-type=entry`);
  return {
    type: FETCH_COMPLETE,
    payload: request
  };
}

export const fetchEntry = () => {

}
