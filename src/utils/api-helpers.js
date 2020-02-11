import axios from 'axios'

import siteConf from '../config/site'

const spsApi = axios.create({ baseURL: siteConf.backend_url })
spsApi.setToken = token => {
  if (token) {
    spsApi.defaults.headers.common['x-access-token'] = token
  } else {
    delete spsApi.defaults.headers.common['x-access-token']
  }
}

export { spsApi }
