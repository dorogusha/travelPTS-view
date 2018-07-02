import { LocalStorage } from 'quasar'
let appSettings = LocalStorage.get.item('MB User Settings') || {}

export default {
  //
  authenticatedData: null,
  appSettings: appSettings,
  items: {}
}
