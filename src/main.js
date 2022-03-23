/*
 * @Author: AmeroL
 * @Date: 2022-03-23 20:53:03
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-23 20:53:03
 * @FilePath: \vue-storepage\src\main.js
 * @email: vian8416@163.com
 */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
