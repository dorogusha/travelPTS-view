// plugin for requests to MGate
import baseMethods from './_base_methods'

import MapApi from './dbApi/_map'
import Tags from './dbApi/_tags'
import Auth from './dbApi/_authorization'
import Users from './dbApi/_users'
import Points from './dbApi/_points'
import Tracks from './dbApi/_tracks'

// plugin MGate
let MGateExtApiPlugin = {}

// TODO: Add base-methods to options (defaultNotifyByErrors, notifyNegative, ...)
// install-func of plugin
MGateExtApiPlugin.install = function (Vue, options) {
  // logic
  let mExtApi = {
    v: Vue,
    // request-client
    apiClient: baseMethods.createApiClient(options),
    // api-paths
    api_paths: {
      ...Tags.api_paths,
      ...Auth.api_paths,
      ...Users.api_paths,
      ...MapApi.api_paths,
      ...Points.api_paths,
      ...Tracks.api_paths
    },

    // BASE-METHODS
    methods: {
      ...options.methods
    },

    // BASE-API-METHODS:
    ...baseMethods.methods,

    // API-METHODS:
    ...Tags.apiMethods,
    ...Auth.apiMethods,
    ...Users.apiMethods,
    ...MapApi.apiMethods,
    ...Points.apiMethods,
    ...Tracks.apiMethods
  }

  // register in Vue
  Vue.prototype.$dbAPI = mExtApi
  Vue.dbAPI = mExtApi
}

export default MGateExtApiPlugin
