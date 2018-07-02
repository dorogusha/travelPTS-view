<template>
  <div class="full-height full-width">
    <q-page-sticky class="z-top" position="top">
      <q-search
        size="17px"
        inverted-light
        clearable
        color="white"
        class="q-caption ellipsis map-searcher-style q-mt-sm"
        style="min-width:300px; width:50%; max-width:500px"
        v-model="terms"
      >
        <q-autocomplete
          separator
          style="min-width:300px; width:50%; max-width:500px"
          size="500px"
          :min-characters=3
          :max-results=10
          class="q-caption q-mt-sm"
          @search="onSearchAddress"
          @selected="onSelectAddress"
        />
      </q-search>
    </q-page-sticky>
    <div id="map" class="full-width full-height">
      <q-resize-observable @resize="onResize"/>
    </div>
  </div>
</template>

<script>
import { filter } from 'quasar'
import L from 'leaflet'

export default {
  name: 'map-container',
  data () {
    return {
      terms: '',
      searchControl: null,
      map: null,
      zoom: 3,
      layers: {},
      markers: {},
      locationMarker: null
    }
  },
  methods: {
    initMap () {
      if (this.map === null) {
        this.map = L.map('map', {
          center: [51.50853, -0.12574],
          zoom: 3,
          doubleClickZoom: false,
          maxBounds: [
            [90, -180],
            [-90, 180]
          ]
        })
        this.map.addEventListener('zoom', e => {
          if (!e.flyTo) {
            this.zoom = e.target.getZoom()
          }
        })
        this.map.addEventListener('movestart', e => {
        })
        this.map.addEventListener('click', e => {
          this.onSearchClear()
          this.$store.dispatch('onMapClick', e)
        })

        this.map.zoomControl.setPosition('topright')
        L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 3, noWrap: true}).addTo(this.map)

        this.$store.dispatch('initMap', this.map)
      }
    },
    initLayer (layerName) {
      if (!(layerName in this.layers)) {
        // create layer object
        this.layers[layerName] = L.layerGroup()
        // save layer name
        this.layers[layerName].name = layerName
        // add layer on map
        this.map.addLayer(this.layers[layerName])
        // init layer caches
        this.markers[layerName] = {}
        this.nameMarkers[layerName] = {}
      }
      return this.layers[layerName]
    },
    clearLayer (layerName) {
      let layer = this.layers[layerName]
      if (layer) {
        layer.clearLayers()
        this.markers[layerName] = {}
      }
    },
    async onSearchAddress (terms, done) {
      let res = await this.$dbAPI.getCoordByAddress(terms)
      res = res.map(data => {
        return {
          label: data.display_name,
          sublabel: `lat: ${data.lat}; lon: ${data.lon};`,
          icon: 'location_on',
          point: [data.lat, data.lon],
          value: data.display_name
        }
      })
      done(filter(terms, {field: 'label', list: res || []}))
    },
    onSelectAddress (result) {
      // create marker with default settings
      this.map.panTo(result.point)
      if (!this.locationMarker) {
        this.locationMarker = L.marker(result.point, {
          icon: L.divIcon({
            className: 'my-div-icon',
            iconAnchor: [12, 15],
            iconSize: new L.Point(25, 30),
            html: '<i class="material-icons q-display-1" style="color:red">location_on</i>'
          })
        })
        this.locationMarker.bindTooltip(`<div>${result.label}</div>`)
        this.locationMarker.addTo(this.map)
      } else {
        this.locationMarker.setLatLng({lat: result.point[0], lng: result.point[1]})
      }
      this.$store.dispatch('onMapLocation', result)
    },
    onSearchClear (value) {
      if (!value && this.locationMarker) {
        this.map.removeLayer(this.locationMarker)
        this.locationMarker.remove()
        this.locationMarker = null
      }
    },
    onResize () {
      if (this.map) {
        this.map.invalidateSize()
      }
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
</style>
