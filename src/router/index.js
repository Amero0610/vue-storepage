/*
 * @Author: AmeroL
 * @Date: 2022-03-23 20:18:58
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-23 23:27:36
 * @FilePath: \vue-storepage\src\router\index.js
 * @email: vian8416@163.com
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//import welcomepageView from '../views/welcomePageView.vue'
import listpageView from '../views/listPageView.vue'
import uploadpageView from '../views/uploadPageView.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
  },
  {
    path:'/listpage',
    name:'FileList',
    component:listpageView
  },
  {
    path:'/uploadpage',
    name:'UploadFile',
    component:uploadpageView
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
