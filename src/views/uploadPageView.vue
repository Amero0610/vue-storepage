<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:17:45
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-24 01:53:37
 * @FilePath: \vue-storepage\src\views\uploadPageView.vue
 * @email: vian8416@163.com
-->
<template>
  <div>
    <el-upload
      ref="uploadMutiple"
      class="upload-demo"
      action
      :http-request="handleUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      :on-change="handleChange"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :list-type="listType"
      :auto-upload="false"
    >
      <el-button
        plain
        slot="trigger"
        size="normal"
        type="primary"
        class="uploadpageButton"
        icon="el-icon-folder-add"
        >Select file</el-button
      >
      <el-button
        :disabled="isDisable"
        plain
        class="uploadpageButton"
        size="normal"
        type="success"
        @click="submitUpload"
        icon="el-icon-upload2"
        >Upload to server</el-button
      >
      <el-button
        :disabled="isDisable"
        plain
        type="primary"
        @click="clearList"
        class="uploadpageButton"
        icon="el-icon-delete"
        size="normal"
      >
        Clear List</el-button
      >
    </el-upload>
  </div>
</template>
<script>
import { put } from "../../public/ali-oss";

export default {
  props: {
    limit: {
      type: Number,
      default: 10,
    },
    action: {
      type: String,
      default: "",
    },
    headers: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "",
    },
    listType: {
      type: String,
      default: "text",
    },
  },
  data: () => ({
    fileList: [],
    isDisable: true,
  }),

  methods: {
    submitUpload() {
      this.$refs.uploadMutiple.submit();
    },
    handleRemove(file, fileList) {
      this.$emit("on-remove", file, fileList);
    },
    handlePreview(file) {
      this.$emit("on-preview", file);
    },
    handleExceed() {
      this.$message.warning(
        `Only ${this.limit} file can be uploaded at a time`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`Confirm Delete ${file.name}?`);
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.$emit("on-success", file, fileList);
      
    },
    toShowList() {
      this.$router.push("/filelist");
    },
    handleChange(file,fileList) {
      // console.log(file);
      this.fileList = fileList;
    },

    handleUpload(option) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      

      console.log(option);
      put(option.file.name, option.file)
        .then((res) => {
          console.log(res);
          loading.close();
          this.$notify({
            title: "Tip",
            message: "Upload Success",
            type: "success",
          });
          this.clearList();
        })
        .catch((error) => {
          loading.close();
          this.$notify({
            title: "Tip",
            message: "Upload Failed!",
            type: "error",
          });
          console.log(error);
        });
    },
    clearList() {
      this.fileList = [];
    },
    setBtnDisable() {
      if (this.fileList.length == 0) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
    },
  },
  watch: {
    fileList: {
      handler() {
      
        this.setBtnDisable();
      },
      deep:true
    },
  },
};
</script>
<style>
.uploadpageButton {
  margin-left: 10px !important;
}
</style>
