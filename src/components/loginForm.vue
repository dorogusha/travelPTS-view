<template>
    <q-list class="no-border">
      <q-item class="q-pt-none q-mt-none">
        <q-input
          class="full-width"
          v-model="form.login"
          :float-label="$t('user')"
          @blur="$v.form.login.$touch"
          @keyup.enter="login"
          :error="$v.form.login.$error"
        />
      </q-item>
      <q-item>
        <q-input
          class="full-width"
          v-model="form.password"
          :float-label="$t('password')"
          type="password"
          @keyup.enter="login"
        />
      </q-item>
      <q-item>
        <q-btn class="q-py-sm q-px-md q-mt-md full-width" color="primary" @click="login" dense>{{$t('enter')}}</q-btn>
      </q-item>
      <!--q-item class="q-caption">
        <q-item-main class="text-center">
          © singleAPP
        </q-item-main>
      </q-item -->
    </q-list>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login-form',
  data () {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      login: { required, minLength: minLength(4) },
      password: { required }
    }
  },
  methods: {
    async login () {
      this.$v.form.$touch()
      if (this.$v.form.$error === false) {
        let resp = await this.$dbAPI.login(this.form.login, this.form.password, false)
        // if response ok
        if (resp && resp.result) {
          this.$store.dispatch('login', resp.result)
          this.$emit('success', resp.result)
        } else {
          // if error
          if (resp.data.errors) {
            this.defaultNotifyByErrors(resp.data.errors)
            // if login true
          } else {
            // if response error
            this.notifyNegative('Login failed', `Error ${resp.status}: ${resp.statusText}`)
          }
          this.$emit('failed', null)
        }
      } else {
        this.notifyNegative('Please review fields again.')
      }
    }
  }
}
</script>

<style scoped>

</style>
