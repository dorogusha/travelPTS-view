import { Notify, Cookies, date } from 'quasar'

// global params/constants
export default {
  data () {
    return {
      // eventHub: new Vue(),
      keyAPIAll: 'all'
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    // load authData from cookies
    loadFromCookieToStore () {
      let authData = Cookies.get('authData')
      if (authData) {
        this.$store.dispatch('setLogin', authData)
      }
    },
    _notify (msg, detailMessage = '', notifyType = 'info') {
      Notify.create({
        message: msg,
        type: notifyType,
        timeout: 5000,
        detail: detailMessage,
        position: 'bottom-left',
        actions: [
          {
            icon: 'close'
          }
        ]
      })
    },
    notifyInfo (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'info')
    },
    notifyWarning (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'warning')
    },
    notifyPositive (msg, detailMessage = '') {
      this._notify(msg, detailMessage, 'positive')
    },
    notifyNegative (msg, detailMessage) {
      this._notify(msg, detailMessage, 'negative')
    },
    // default notify by array errors
    defaultNotifyByErrors (errors) {
      let reasons = []
      for (let i in errors) {
        let reason = errors[i].reason
        let info = ''
        // if error.value
        if (errors[i].value) {
          info = `value: ${errors[i].value}`
        }
        // if error.id
        if (errors[i].id) {
          if (info) {
            info = `${info}, id: ${errors[i].id}`
          } else {
            info = `id: ${errors[i].id}`
          }
        }
        // add message
        if (info) {
          reason = `${reason} (${info})`
        }
        reasons.push(reason)
      }
      this.notifyNegative(`Error getting Units from API: ${reasons.join()}`)
    },
    // to format-date
    applyFormatDate (value) {
      return date.formatDate(value * 1000, 'DD.MM.YYYY HH:mm:ss')
    },
    // convet color form number to HEX & vice versa
    convertColor (color) {
      let result
      // from  16-number-system to HEX
      if (isFinite(color)) {
        result = '#' + Math.abs(parseInt(color)).toString(16)
        // from  HEX to 16-number-system
      } else if (color && typeof color === 'string') {
        result = parseInt(color.substr(1), 16)
      }
      return result
    }
  }
}
