<template>
  <q-card class="no-shadow">
    <!--fields and actions-->
    <track-form :track="track" :saveCallback="create"></track-form>
    <!--end fields and actions-->
  </q-card>
</template>

<script>
import TrackForm from './TrackForm'

export default {
  name: 'create-track',
  components: {
    TrackForm
  },
  data () {
    return {
      // model Track
      track: {
        label: '',
        description: '',
        points: ''
      }
    }
  },
  methods: {
    // create track
    async create (track, collectData) {
      // send request to API
      let respData = await this.$dbAPI.createTracks([collectData])
      // result error: notify
      if (respData.errors && respData.errors.length) {
        this.notifyNegative(`$t('error_element_created') '$t('track')', ${respData.errors[0].reason}`)
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
