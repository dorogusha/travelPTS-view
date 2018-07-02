<template>
  <q-card class="no-shadow">
    <!--fields and actions-->
    <point-form :point="point" :saveCallback="create"></point-form>
    <!--end fields and actions-->
  </q-card>
</template>

<script>
import PointForm from './PointForm'

export default {
  name: 'create-point',
  components: {
    PointForm
  },
  data () {
    return {
      // model Point
      point: {
        label: '',
        description: '',
        position: '',
        location: '',
        tags: []
      }
    }
  },
  methods: {
    // create point
    async create (point, collectData) {
      // send request to API
      let respData = await this.$dbAPI.createPoints([collectData])
      // result error: notify
      if (respData.errors && respData.errors.length) {
        this.notifyNegative(`$t('error_element_created') '$t('point')', ${respData.errors[0].reason}`)
        // result success: notify and redirect
      }
      if (respData.result && respData.result.length) {
        this.notifyPositive(this.$t('success_element_created'))
        this.$emit('save-event', respData.result)
      }
    }
  }
}
</script>

<style>
</style>
