import axios from 'axios'

import siteConf from '../config/site'

const spsApi = axios.create({ baseURL: siteConf.backend_url })

const setSpsApiToken = token => {
  if (token) {
    spsApi.defaults.headers.common['x-access-token'] = token
  } else {
    delete spsApi.defaults.headers.common['x-access-token']
  }
}

export { spsApi, setSpsApiToken }
