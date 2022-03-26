<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:21:34
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-27 00:18:22
 * @FilePath: \vue-storepage\src\views\welcomePageView.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="welcomepage">
    <el-row type="flex" justify="center">
      <el-col :xs="12" :xl="6" :span="12" :lg="6" :md="6">
        <el-button
          type="primary"
          round
          @click="toListPage"
          icon="el-icon-tickets"
          plain
        >
          Show File List
        </el-button>
      </el-col>
      <el-col :xs="12" :xl="6" :span="12" :lg="6" :md="6">
        <el-button
          type="primary"
          round
          @click="toUploadPage"
          icon="el-icon-upload"
          plain
          >Upload File</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<style>
#welcomepage * {
  text-align: center;
}
#welcomepage {
  margin-top: 20px;
}
</style>
<script>
export default {
  data: () => ({}),
  methods: {
    toListPage() {
      this.$router.push('/listpage');
    },
    toUploadPage() {
      this.$router.push('/uploadpage');
    },
  },
};
</script>
