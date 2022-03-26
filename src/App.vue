<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:19:34
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-27 00:52:22
 * @FilePath: \vue-storepage\src\App.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="app">
    <mainPage> </mainPage>
    <transition name="fade" mode="out-in">
      <div id="routerView-panel">
        <router-view id="showArea"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
import mainPage from './views/welcomePageView.vue';
export default {
  name: 'app',
  components: { mainPage },
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */

  color: #2c3e50;
  margin-top: 60px;
  min-width: 360px;
  margin: 0px;
  padding: 0px;
}
#showArea {
  margin-top: 13px;
  min-width: 380px;
}
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
* .el-dialog__wrapper {
  transition-duration: 0.3s !important;
}
</style>
