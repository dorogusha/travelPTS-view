import AsyncComputed from 'vue-async-computed'
import { Vuelidate, validationMixin } from 'vuelidate'
import mixinPublic from '../util/mixinPublic'

import dbApiPlugin from './dbApiPlugin'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // use PublicMixin - public constants
  Vue.mixin(mixinPublic)

  // use AsyncComputed
  Vue.use(AsyncComputed)

  // use validator
  Vue.use(Vuelidate)
  Vue.mixin(validationMixin)

  // use api
  // axios.defaults.baseURL = '/api'

  // use auto tag binding plugin
  Vue.use(dbApiPlugin, {
    // basePath: '/api',
    methods: mixinPublic.methods
  })
}
