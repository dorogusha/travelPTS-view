<template>
  <q-carousel
    :easing="overshoot"
    infinites
    arrows
    quick-nav
    color="white"
  >
    <q-carousel-control
      slot="control-button"
      slot-scope="carousel"
      position="top-right"
    >
      <q-btn
        round dense push
        color="primary"
        icon="add"
        @click="addPoint()"
      />
    </q-carousel-control>
    <q-carousel-slide class="q-pa-none q-ma-none">
      <q-list class="q-pa-none q-ma-none no-border">
        <q-item class="q-pa-none q-ma-none">
          <q-field :count="200" dense class="full-width">
            <q-input
              class="full-width"
              clearable
              v-model="track.label"
              type="text"
              @blur="$v.track.label.$touch"
              @keyup.enter="registration"
              :error="$v.track.label.$error"
              :float-label="$t('label')"
              :maxlength="200"
            />
          </q-field>
        </q-item>
        <q-item class="q-pa-none q-ma-none">
          <q-field :count="200" dense class="full-width">
            <q-input
              class="full-width"
              clearable
              v-model="track.description"
              type="textarea"
              @input="$v.track.description.$touch"
              :error="$v.track.description.$error"
              :float-label="$t('description')"
              :maxlength="200"
              :max-height="50"
            />
          </q-field>
        </q-item>
      </q-list>
    </q-carousel-slide>
    <q-carousel-slide
      v-for="(point, n) in points" :key="`anim-${n}`"
      class="q-ma-none q-pa-none"
    >
      <point-form :point="point"></point-form>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { easing } from 'quasar'
import PointForm from '../points/PointForm'

export default {
  name: 'track-form',
  props: ['track', 'saveCallback'],
  components: { PointForm },
  data () {
    return {
      overshoot: easing.overshoot,
      points: []
    }
  },
  computed: {
    auth () { return this.$store.state.authenticatedData || {} },
    onMapLocation () { return this.$store.state.onMapLocation },
    onMapClick () { return this.$store.state.onMapClick }
  },
  watch: {
    onMapClick (evt) {
      this.addPoint(evt.latlng)
    }
  },
  validations: {
    track: {
      label: {required, minLength: minLength(4)},
      description: {required, maxLength: maxLength(200)}
    }
  },
  methods: {
    addPoint (pos) {
      let point = {
        label: '',
        description: '',
        position: pos ? { lat: pos.lat, lng: pos.lng } : {},
        location: '',
        creater_id: this.auth.id
      }
      if (this.points && (!this.points.length || (this.points.slice(-1).label && this.points.slice(-1).location))) {
        this.points.push(point)
        this.updateLocation(point, pos)
      } else {
        this.notifyInfo(this.$t('fill_last_point_data'))
      }
      console.log(this.points)
    },
    // update location
    async updateLocation (point, position) {
      if (!position) {
        return
      }
      let res = await this.$dbAPI.getAddressByCoord(position.lat, position.lng)
      point.location = res
    },
    // save (create or update) Model
    onSave () {
      this.$v.$touch()
      // if validate
      if (this.$v.$error === false) {
        // save track
        this.saveCallback(this.track, this.collectData())
      } else {
        this.notifyNegative('Form filled in incorrectly')
      }
    },
    // collect data for request post/put
    collectData () {
      let res = {
        label: this.track.label,
        description: this.track.description,
        // points: [],
        creater_id: this.auth.id
      }
      return res
    }
  }
}
</script>

<style scoped>
</style>
