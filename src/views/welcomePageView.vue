<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:21:34
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-24 00:45:02
 * @FilePath: \vue-storepage\src\views\welcomePageView.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="welcomepage">
    <el-row type="flex" justify="center">
      <el-col :xs="9" :xl="5" :span="5" :lg="5" :md="5">
        <el-button type="primary" @click="toListPage" icon="el-icon-tickets" plain>
          Show File List
        </el-button>
      </el-col>
      <el-col :xs="9" :xl="5" :span="5" :lg="5" :md="5">
        <el-button type="primary" @click="toUploadPage" icon="el-icon-upload" plain>Upload File</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style>
#welcomepage * {
  text-align: center;
}
</style>
<script>
export default {
  data: () => ({}),
  methods: {
    toListPage() {
      this.$router.push("/listpage");
    },
    toUploadPage() {
      this.$router.push("/uploadpage");
    },
  },
};
</script>