import Vue from 'vue'
import VueRouter from 'vue-router'

import DefaultLayout from '@/layouts/Default'
import NoticeView from '@/views/Notice'
import SearchView from '@/views/Search'
import DetailView from '@/views/Detail'
import UserView from '@/views/User'
import TestView from '@/views/Test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        name: 'Notice',
        path: '/',
        component: NoticeView
      },
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
      {
        name: 'User',
        path: 'user',
        component: UserView,
      },
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/cookbook',
  routes
})

export default router
