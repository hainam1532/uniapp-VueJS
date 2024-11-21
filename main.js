import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import Vant from 'vant' // Import thư viện Vant
import 'vant/lib/index.css' // Import CSS của Vant

Vue.use(Vant) // Đăng ký Vant cho Vue 2

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Vant) // Đăng ký Vant cho Vue 3
  return {
    app,
  }
}
// #endif
