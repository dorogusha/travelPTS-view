<template>
  <q-list class="no-border">
    <q-item class="q-pt-none q-mt-none">
      <q-field :count="100" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="form.name"
          type="text"
          @blur="$v.form.name.$touch"
          @keyup.enter="registration"
          :error="$v.form.name.$error"
          :float-label="$t('name')"
          :maxlength="100"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-field :count="200" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          style="min-height: 40px"
          v-model="form.description"
          type="textarea"
          @input="$v.form.description.$touch"
          :error="$v.form.description.$error"
          :float-label="$t('description')"
          :maxlength="200"
          :max-height="100"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-input
        class="full-width"
        clearable
        v-model="form.password"
        type="password"
        @keyup.enter="registration"
        :float-label="$t('password')"
      />
    </q-item>
    <q-item>
      <q-field :count="30" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="form.email"
          type="text"
          @input="$v.form.email.$touch"
          @keyup.enter="registration"
          :error="$v.form.email.$error"
          :maxlength="30"
          :float-label="$t('email')"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-btn class="q-py-sm q-px-md q-mt-md full-width" color="primary" @click="registration" dense>{{$t('registration')}}</q-btn>
    </q-item>
    <!-- q-item class="q-caption">
      <q-item-main class="text-center">
        © singleAPP
      </q-item-main>
    </q-item -->
  </q-list>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'registration-form',
  data () {
    return {
      form: {
        name: '',
        description: '',
        password: '',
        email: ''
      }
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(4) },
      description: {maxLength: maxLength(200)},
      password: { required },
      email: {required, email}
    }
  },
  methods: {
    collectData () {
      return {
        name: this.form.name,
        description: this.form.description,
        password: this.form.password,
        email: this.form.email
      }
    },
    async registration () {
      this.$v.form.$touch()
      if (this.$v.form.$error === false) {
        let resp = await this.$dbAPI.createUsers([this.collectData()], false)
        // if response ok
        if (resp && resp.result) {
          this.$emit('success', resp.result)
        } else {
          // if error
          if (resp.data.errors) {
            this.defaultNotifyByErrors(resp.data.errors)
          } else {
            this.notifyNegative(this.$t('failed_login'), `Error ${resp.status}: ${resp.statusText}`)
          }
          this.$emit('failed', null)
        }
      } else {
        this.notifyNegative(this.$t('failed_fields'))
      }
    }
  }
}
</script>

<style scoped>

</style>
