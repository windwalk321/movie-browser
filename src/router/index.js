import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const createListView = (id, name) => () => import('../views/CreateListView').then(m => m.default(id, name))

const routes = [
  {
    path: '/',
    redirect: '/popular'
  },
  {
    path: '/popular/:page(\\d+)?',
    component: createListView('popular', 'popular')
  },
  {
    path: '/top/:page(\\d+)?',
    component: createListView('top_rated', 'top')
  },
  {
    path: '/upcoming/:page(\\d+)?',
    component: createListView('upcoming', 'upcoming')
  },
  {
    path: '/now/:page(\\d+)?',
    component: createListView('now_playing', 'now')
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../views/Movie.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
