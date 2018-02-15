import { buildDevApp } from 'webpack-vue-typescript-config/dist/vue-dev-app'
import { routes } from './src/index'

buildDevApp(routes, '/');