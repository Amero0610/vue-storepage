<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:17:45
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-26 15:13:05
 * @FilePath: \vue-storepage\src\views\uploadPageView.vue
 * @email: vian8416@163.com
-->
<template>
  <div id="uploadpage">
    <div id="uploadBtnPanel">
      <el-row type="flex" justify="start">
        <el-col :span="5" :xs="11" :xl="4" :lg="5" :sm="5" :md="5">
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
        </el-col>
        <el-col :span="2" :xs="8" :xl="4" :lg="4" :sm="4" :md="4">
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
        </el-col>
        <el-col
          id="selectPanel"
          :span="4"
          :xs="8"
          :xl="4"
          :sm="4"
          :lg="4"
          :md="4"
        >
          <el-select v-model="selectValue" placeholder="Please Choose">
            <el-option
              v-for="item in folderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div id="uploadArea">
      <el-row type="flex" justify="space-around">
        <el-col :span="6" :xs="12" :xl="6" :lg="6" :md="6">
          <el-upload
            ref="uploadMutiple"
            class="upload-demo"
            action
            drag
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
            :on-progress="handleProcess"
            :auto-upload="false"
          >
            <!-- <el-button plain
                 slot="trigger"
                 size="normal"
                 type="primary"
                 class="uploadpageButton"
                 icon="el-icon-folder-add">Select file</el-button> -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              Drag files here, or <em>click Upload</em>
            </div>
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { putByFolderName } from '../../public/ali-oss';
var uploadFileCount = 0;
export default {
  props: {
    limit: {
      type: Number,
      default: 10,
    },
    action: {
      type: String,
      default: '',
    },
    headers: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: '',
    },
    listType: {
      type: String,
      default: 'text',
    },
  },
  data: () => ({
    selectValue: '',
    folderList: [
      {
        value: 'myCloudStore-img/',
        label: 'Image',
      },
      {
        value: 'myCloudStore-document/',
        label: 'Document',
      },
      {
        value: 'myCloudStore-media/',
        label: 'Media',
      },

      {
        value: 'myCloudStore/',
        label: 'File',
      },
    ],
    fileList: [],
    isDisable: true,
  }),

  methods: {
    submitUpload() {
      this.$refs.uploadMutiple.submit();
    },
    handleRemove(file, fileList) {
      this.$emit('on-remove', file, fileList);
    },
    handlePreview(file) {
      this.$emit('on-preview', file);
    },
    handleExceed() {
      this.$message.warning(
        `Only ${this.limit} file can be uploaded at a time`
      );
    },

    beforeRemove(file) {
      return this.$confirm(`Confirm Delete ${file.name}?`);
    },
    handleProcess() {},
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.$emit('on-success', file, fileList);
    },
    toShowList() {
      this.$router.push('/filelist');
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      uploadFileCount = this.fileList.length;
    },

    handleUpload(option) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      // put(option.file.name, option.file);
      putByFolderName(this.selectValue, option.file.name, option.file)
        .then(() => {
          uploadFileCount--;
          if (uploadFileCount == 0) {
            loading.close();
          }
          this.$notify({
            title: 'Tip',
            message: 'Upload Success',
            type: 'success',
          });
          this.clearList();
        })
        .catch(() => {
          uploadFileCount--;
          if (uploadFileCount == 0) {
            loading.close();
          }
          this.$notify({
            title: 'Tip',
            message: 'Upload Failed!',
            type: 'error',
          });
        });
    },
    clearList() {
      this.fileList = [];
    },
    setBtnDisable() {
      if (this.fileList.length == 0 || this.selectValue == '') {
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
      deep: true,
    },
    selectValue: {
      handler() {
        this.setBtnDisable();
      },
      deep: true,
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

.el-select-dropdown__list,
.el-input__inner {
  font-family: 'Montserrat' !important;
}
#uploadArea .el-upload-dragger {
  margin-top: 30px;
}
.uploadpageButton {
  margin-left: 10px !important;
}
@media (max-width: 520px) {
  #uploadBtnPanel {
    margin-bottom: 60px;
  }
  #uploadArea .el-upload-dragger {
    margin-left: -80px;
  }
  #uploadBtnPanel #selectPanel {
    width: 300px;

    position: absolute;
    top: 40px;
    left: 10px;
    margin-top: 20px;
  }
}
</style>
