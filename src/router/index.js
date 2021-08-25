import Vue from 'vue'
import VueRouter from 'vue-router'

import DefaultLayout from '@/layouts/Default'
import SearchView from '@/views/Search'
import DetailView from '@/views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        name: 'Search',
        path: 'search',
        component: SearchView
      },
      {
        name: 'Detail',
        path: 'detail/:id',
        component: DetailView,
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/cookbook',
  routes
})

export default router
