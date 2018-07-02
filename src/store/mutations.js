import Vue from 'vue'

export default {
  //
  LOGIN (state, data) {
    Vue.set(state, 'authenticatedData', data)
  },
  ITEMS (state, data) {
    Vue.set(state.items, data[0], data[1])
  },
  MAP (state, data) {
    Vue.set(state, 'map', data)
  },
  MAP_CLICK (state, data) {
    Vue.set(state, 'onMapClick', data)
  },
  MAP_LOCATION (state, data) {
    Vue.set(state, 'onMapLocation', data)
  }
}
