<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:19:34
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-25 01:13:14
 * @FilePath: \vue-storepage\src\App.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="app">
    <mainPage> </mainPage>
    <transition name="fade"
                mode="out-in">
      <router-view id="showArea"></router-view>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  font-family: 'Montserrat', sans-serif !important;

  color: #2c3e50;
  margin-top: 60px;
  min-width: 360px;
  margin: 0px;
  padding: 0px;
}
#showArea {
  margin-top: 20px;
  min-width: 390px;
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
