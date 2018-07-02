<template>
  <q-list class="no-border">
    <q-item class="q-pa-none q-ma-none">
      <q-field :count="200" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="point.label"
          type="text"
          @blur="$v.point.label.$touch"
          @keyup.enter="registration"
          :error="$v.point.label.$error"
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
          v-model="point.description"
          type="textarea"
          @input="$v.point.description.$touch"
          :error="$v.point.description.$error"
          :float-label="$t('description')"
          :maxlength="200"
          :max-height="50"
        />
      </q-field>
    </q-item>
    <q-item class="q-pa-none q-ma-none">
      <div class="full-width row">
        <q-field class="col-6 q-pr-sm" ><q-input type="text" :float-label="$t('lat')" :value="lat" clearable/></q-field>
        <q-field class="col-6 q-pl-sm" ><q-input type="text" :float-label="$t('lng')" :value="lng" clearable/></q-field>
      </div>
    </q-item>
    <q-item class="q-pa-none q-ma-none q-mt-md">
      <q-input class="full-width" type="text" :float-label="$t('location')" :value="location" clearable/>
    </q-item>
    <!-- q-item class="q-pa-none q-ma-none">
      <q-field dense class="full-width">
        <b-virtual-select
          filter
          chips
          :chips-max-count="10"
          multiple
          labelLines="5"
          v-model="tags"
          @input="$v.tags.$touch"
          :error="$v.tags.$error"
          :options="tagsListOptions"
          :float-label="$t('tags')"
          default-helper
        />
      </q-field>
    </q-item -->
    <q-item class="q-pa-none q-ma-none block text-right">
      <q-btn icon="done" color="primary" round class="q-ml-sm" @click="onSave"></q-btn>
    </q-item>
  </q-list>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import BVirtualSelect from 'b-virtual-select'

export default {
  name: 'point-form',
  props: ['point', 'saveCallback'],
  components: {
    BVirtualSelect
  },
  data () {
    return {
      tags: this.point.tags || [],
      lat: this.point.position ? this.point.position.lat : '',
      lng: this.point.position ? this.point.position.lng : '',
      location: this.point.location || ''
    }
  },
  computed: {
    auth () { return this.$store.state.authenticatedData || {} },
    onMapLocation () { return this.$store.state.onMapLocation },
    onMapClick () { return this.$store.state.onMapClick }
  },
  watch: {
    onMapLocation (evt) {
      this.lat = evt.point[0]
      this.lng = evt.point[1]
      this.location = evt.label
    },
    onMapClick (evt) {
      this.lat = evt.latlng.lat
      this.lng = evt.latlng.lng
      this.updateLocation(evt.latlng)
    }
  },
  validations: {
    point: {
      label: { required, minLength: minLength(4) },
      description: { required, maxLength: maxLength(200) }
    },
    lat: { required },
    lng: { required },
    location: { required },
    tags: { maxLength: maxLength(10) }
  },
  asyncComputed: {
    tagsListOptions: {
      lazy: true,
      async get () {
        let response = await this.$dbAPI.getTags()
        let res = []
        if (response && response.result) {
          res = response.result.map(tag => { return { value: tag.id, label: tag.label } })
        }
        return res
      },
      default () {
        return []
      }
    }
  },
  methods: {
    // update location
    async updateLocation (point) {
      let res = await this.$dbAPI.getAddressByCoord(point.lat, point.lng)
      this.location = res
    },
    // save (create or update) Model
    onSave () {
      this.$v.point.$touch()
      // if validate
      if (this.$v.point.$error === false) {
        // save point
        this.saveCallback(this.point, this.collectData())
      } else {
        this.notifyNegative('Form filled in incorrectly')
      }
    },
    // collect data for request post/put
    collectData () {
      let res = {
        label: this.point.label,
        description: this.point.description,
        position: {lat: this.lat, lng: this.lng},
        location: this.location,
        creater_id: this.auth.id
      }
      return res
    }
  }
}
</script>

<style scoped>
</style>
