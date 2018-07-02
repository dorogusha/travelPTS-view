import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

let appSettings = LocalStorage.get.item('MB User Settings') || {}

const store = new Vuex.Store(
  {
    state: {
      // authorization data
      authenticatedData: {},
      //
      appSettings: appSettings,
      // actual items data, such as unit position or address & activity
      items: {},
      // map click event
      onMapClick: null,
      // map select location event
      onMapLocation: null
    },
    actions,
    mutations,
    getters
  }
)

export default store
