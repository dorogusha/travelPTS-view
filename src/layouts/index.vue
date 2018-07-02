<template>
  <q-layout view="lhh Lpr lFf">
    <!-- optional -->
    <q-layout-header class="non-selectable">
      <q-toolbar color="primary" shrink class="q-pr-none">
        <q-btn flat round dense icon="menu" @click="showLeftMenu=!showLeftMenu" aria-label="Toggle menu on left side" />
        <q-toolbar-title>
          {{ $t($route.meta.label) }}
          <span slot="subtitle">App for your travel points</span>
        </q-toolbar-title>
        <q-btn v-if="authData" class="q-mx-sm" flat outline :label="$t('profile')"  @click="showLoginPanel=true"/>
        <q-btn v-else class="q-mx-sm" flat outline :label="$t('enter')" @click="showLoginPanel=true;expandLogin=true"/>
        <q-btn v-if="authData" class="q-mx-sm" flat outline :label="$t('exit')"  @click="logout"/>
      </q-toolbar>
    </q-layout-header>

    <!-- optional -->
    <q-layout-drawer
      side="left"
      v-model="showLeftMenu"
    >
      <!-- content; any -->
    </q-layout-drawer>

    <!-- REQUIRED -->
    <q-page-container class="fixed-top fixed-left full-width full-height block">
      <map-container/>
      <q-page-sticky class="z-top" position="right" :offset="[10, 10]">
        <q-btn class="q-mb-sm" round color="primary" @click="$router.push({name: 'SearchPanel'})" icon="search" /><br>
        <q-btn v-if="authData" class="q-mb-sm" round color="primary" icon="timeline" @click="$router.push({name: 'CreateTrack'})"><q-tooltip>{{$t('add_track')}}</q-tooltip></q-btn><br>
        <q-btn v-if="authData" round color="primary" icon="location_on" @click="$router.push({name: 'CreatePoint'})"><q-tooltip>{{$t('add_point')}}</q-tooltip></q-btn>
      </q-page-sticky>
      <!-- container for database data -->
      <q-page-sticky class="z-top" position="bottom">
        <q-collapsible
          id="data_container"
          class="data-container q-pa-none q-ma-none text-primary"
          :icon="$route.meta.icon"
          :icon-right="$route.meta.icon_right"
          :label="$t($route.meta.label)"
          v-model="expandContainer"
        >
          <router-view v-on:save-event="onRouteSaveEvent($event)"/>
        </q-collapsible>
      </q-page-sticky>
    </q-page-container>

    <!-- auth dialogs -->
    <q-modal v-model="showLoginPanel">
      <profile-form v-if="authData && authData.name"></profile-form>
      <div v-else >
        <q-collapsible group="auth" :label="$t('authorization')" v-model="expandLogin">
          <login-form v-on:success="onLogin($event)" v-on:failed="onLogin($event)"></login-form>
        </q-collapsible>
        <q-collapsible group="auth" :label="$t('registration')">
          <registration-form v-on:success="onRegister($event)" v-on:failed="onRegister($event)"></registration-form>
        </q-collapsible>
        <div class="full-width q-caption text-center q-mb-sm">© singleAPP</div>
      </div>
    </q-modal>
  </q-layout>
</template>

<script>
import { Cookies } from 'quasar'
import MapContainer from '../components/MapContainer'
import LoginForm from '../components/loginForm'
import ProfileForm from '../components/profileForm'
import RegistrationForm from '../components/registrationForm'

export default {
  name: 'index',
  components: {
    MapContainer,
    LoginForm,
    ProfileForm,
    RegistrationForm
  },
  data () {
    return {
      showLeftMenu: false,
      showLoginPanel: false,
      showRregisterPanel: false,
      expandLogin: true,
      expandContainer: true
    }
  },
  computed: {
    authData () {
      return this.$store.getters.getAuthData
    }
  },
  methods: {
    onRegister (data) {
      this.showRregisterPanel = false
    },
    onLogin (data) {
      this.showLoginPanel = false
    },
    logout () {
      this.$dbAPI.logout(this.authData.sid)
      this.$store.dispatch('logout')
    },
    onRouteSaveEvent () {
      this.expandContainer = false
      this.$router.push({name: 'SearchPanel'})
    },
    searching () {
      console.log('search')
    }
  },
  mounted () {
    this.$dbAPI.getTags()
    let authData = Cookies.get('travelpts-authData')
    if (authData) {
      this.$store.dispatch('login', authData)
    }
  }
}
</script>

<style>
  .data-container {
    background: white;
    min-width: 100px;
    min-height: 30px;
    overflow: hidden;
  }
</style>
