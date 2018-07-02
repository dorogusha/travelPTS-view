import { Cookies } from 'quasar'
import Vue from 'vue'

export default {
  //
  login ({commit, state}, data) {
    // console.log('Login by user ', data)
    // set authData in Cookies
    if (!Cookies.has('travelpts-authData')) {
      Cookies.set('travelpts-authData', JSON.stringify(data), {expire: 3})
    }
    // set authData in state
    commit('LOGIN', data)
    // set http-header
    Vue.dbAPI.setHeader('X-AccessToken', data.sid)
  },
  // logout
  logout ({commit, state}) {
    // delete from state
    commit('LOGIN', null)
    for (let itemType in state.items) {
      commit('ITEMS', [itemType, null])
    }
    // delete cookies
    Cookies.remove('travelpts-authData')
    // delete header
    Vue.dbAPI.delHeader('X-AccessToken')
  },
  initMap ({commit, state}, mapObject) {
    commit('MAP', mapObject)
  },
  onMapClick ({commit, state}, evt) {
    commit('MAP_CLICK', evt)
  },
  onMapLocation ({commit, state}, evt) {
    commit('MAP_LOCATION', evt)
  }
}
