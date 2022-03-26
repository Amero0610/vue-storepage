/*
 * @Author: AmeroL
 * @Date: 2022-03-23 20:53:03
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-26 01:08:50
 * @FilePath: \vue-storepage\src\main.js
 * @email: vian8416@163.com
 */
import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import '../public/style/theme/index.css';
import VueClipboard from 'vue-clipboard2';
import vuetify from './plugins/vuetify'
Vue.use(VueClipboard);
Vue.config.productionTip = false;

new Vue({
 router,
 vuetify,
 render: (h) => h(App)
}).$mount('#app');
