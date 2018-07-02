<template>
  <q-card class="no-shadow">
    <!--fields and actions-->
    <track-form :track="track" :saveCallback="update"></track-form>
    <!--end fields and actions-->
  </q-card>
</template>

<script>
import TrackForm from './TrackForm'

export default {
  name: 'edit-track',
  components: {
    TrackForm
  },
  data () {
    return {
      // model Track
      track: {
        label: '',
        description: '',
        points: []
      }
    }
  },
  methods: {
    // create track
    async update (track, collectData) {
      // send request to API
      let respData = await this.$dbAPI.createTracks([collectData])
      // result error: notify
      if (respData.errors && respData.errors.length) {
        this.notifyNegative(`$t('error_element_updated') '$t('track')', ${respData.errors[0].reason}`)
        // result success: notify and redirect
      }
      if (respData.result && respData.result.length) {
        this.notifyPositive(this.$t('success_element_updated'))
        this.$emit('save-event', respData.result)
      }
    }
  }
}
</script>

<style>
</style>
