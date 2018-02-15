import { RouteConfig } from 'vue-router'

const routes : Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('./Main.vue')
  }
]

export default routes
