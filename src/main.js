// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
// 引入vux模态组件
import {ToastPlugin, ConfirmPlugin, LoadingPlugin, AlertPlugin} from 'vux'
// 引入工具函数
import {remConfig} from './utils/remConfig'

Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

// 设置根rem及相关配置
remConfig()

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
