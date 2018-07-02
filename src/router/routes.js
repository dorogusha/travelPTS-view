
export default [
  {
    path: '/',
    component: () => import('layouts/index'),
    children: [
      // search panel
      { path: 'search', name: 'SearchPanel', component: () => import('pages/search/SearchPanel'), meta: {label: 'search', icon: 'search'} },
      // points
      { path: 'point/create', name: 'CreatePoint', component: () => import('pages/points/create'), meta: {label: 'add_point', icon: 'location_on', icon_right: 'done'} },
      { path: 'point/:id', name: 'EditPoint', component: () => import('pages/points/edit'), meta: {label: 'edit_point', icon: 'location_on', icon_right: 'done'} },
      // tracks
      { path: 'track/create', name: 'CreateTrack', component: () => import('pages/tracks/create'), meta: {label: 'add_track', icon: 'timeline', icon_right: 'done'} },
      { path: 'track/:id', name: 'EditTrack', component: () => import('pages/tracks/edit'), meta: {label: 'edit_track', icon: 'timeline', icon_right: 'done'} }
    ],
    meta: {label: 'app_name'} // add label as link from vocabulary
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
