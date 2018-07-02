<template>
  <q-list class="no-border">
    <q-item class="q-pt-none q-mt-none">
      {{$t('name')}}: {{authData.name}}
    </q-item>
    <q-item>
      {{$t('description')}}: {{authData.description}}
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'profile-form',
  computed: {
    authData () {
      return this.$store.getters.getAuthData
    }
  }
}
</script>

<style scoped>

</style>
