<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:17:30
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-27 00:18:08
 * @FilePath: \vue-storepage\src\views\listPageView.vue
 * @email: vian8416@163.com
-->

<template>
  <div id="listpage">
    <!-- <el-button type="primary" @click="addItem"> add</el-button> -->
    <div id="listpageBtnPanel">
      <el-row type="flex" justify="flex-start">
        <el-col :span="4" :xs="9" :xl="4" :lg="4" :md="4">
          <el-button
            type="primary"
            plain
            @click="refreshList"
            icon="el-icon-notebook-2"
            >Refresh list</el-button
          >
        </el-col>
        <el-col :span="6" :xs="9" :xl="6" :lg="6" :md="6">
          <el-select
            v-model="selectValue"
            :popper-append-to-body="false"
            popper-class="select-popper"
            placeholder="Please Choose"
          >
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
    <div id="tablePanel">
      <el-empty description="No Data" v-if="showEmpty"></el-empty>

      <el-table
        v-if="!showEmpty"
        :data="fileList"
        height="80vh"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          label="Name"
          property="name"
          align="left"
          min-width="260"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{
            scope.row.name | nameFilter
          }}</template>
        </el-table-column>
        <el-table-column
          label="Size"
          property="size"
          align="left"
          width="90"
          min-width="120"
        >
          <template slot-scope="scope">{{
            scope.row.size | sizeFilter
          }}</template>
        </el-table-column>
        <el-table-column
          label="Time"
          prop="lastModified"
          align="left"
          width="120"
          min-width="120"
        >
          <template slot-scope="scope">{{
            scope.row.lastModified | lastModifiedFilter
          }}</template>
        </el-table-column>
        <el-table-column label="Url" property="url" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="right"
          min-width="230"
          fixed="right"
          width="230"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-copy-document"
              @click="copyUrl"
              v-clipboard:copy="scope.row.url"
              >Copy</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              @click="confirmDelete(scope.row)"
            >
              Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
//
import { deleteItemOSS, getByFolderName } from '../../public/ali-oss';
var INDEX = 1321;
export default {
  data: () => ({
    currentRowClassName: '',
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
    showEmpty: false,
    fileList: [
      // {
      //   name: "nam1",
      //   url: "321321",
      //   size: "3721838921",
      // },
      // {
      //   name: "nam12",
      //   url: "32132221",
      //   size: "3738921",
      // },
      // {
      //   name: "nam211",
      //   url: "3978951",
      //   size: "3721891",
      // },
    ],
  }),
  methods: {
    addItem() {
      let tempObj = new Object();
      tempObj.name = '321' + INDEX;
      tempObj.url = 'dsa' + INDEX;
      tempObj.size = '32193821' + INDEX;
      tempObj.lastModified = '2022-03-23T14:46:38.000Z';
      INDEX++;
      this.fileList.push(tempObj);
    },
    refreshList() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      getByFolderName(this.selectValue).then((result) => {
        loading.close();
        this.fileList = result.objects;
        this.deleteEmptyItem(this.fileList);
      });
    },
    handleCurrentChange() {},
    copyUrl() {
      this.$message({
        type: 'success',
        message: 'The link has been copied to the clipboard!',
      });
    },
    confirmDelete(_option) {
      this.$confirm('Do you want to delete this file?', 'Tip', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        beforeClose(action, instance, done) {
          done();
        },
      })
        .then(() => {
          this.deleteItem(_option);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Undelete!',
          });
        });
    },
    deleteListItem(_name) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name == _name) {
          this.fileList.splice(i, 1);
        }
      }
    },
    deleteItem(option) {
      this.$message({
        type: 'success',
        message: 'Successfully deleted!',
      });
      let fileName = option.name;
      deleteItemOSS(fileName)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      this.deleteListItem(fileName);
    },
    setEmptyPanel() {
      if (this.fileList.length == 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
    },
    deleteEmptyItem(_List) {
      for (let i = 0; i < _List.length; i++) {
        if (_List[i].size == 0) {
          _List.splice(i, 1);
        }
      }
    },
  },
  watch: {
    fileList: {
      handler() {
        this.setEmptyPanel();
      },
      deep: true,
    },
    selectValue: {
      handler() {
        this.refreshList();
      },
      deep: true,
    },
  },
  mounted() {
    this.selectValue = 'myCloudStore-img/';
    this.setEmptyPanel();
  },
  filters: {
    nameFilter(remote_filename) {
      let filenameArray = remote_filename.split('/');
      return filenameArray[filenameArray.length - 1];
    },
    sizeFilter(size) {
      var data = '';
      if (size < 0.1 * 1024) {
        data = size.toFixed(2) + 'B';
      } else if (size < 1 * 1024 * 1024) {
        data = (size / 1024).toFixed(2) + 'KB';
      } else if (size < 1 * 1024 * 1024 * 1024) {
        data = (size / (1024 * 1024)).toFixed(2) + 'MB';
      } else {
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
      }
      var sizestr = data + '';
      var len = sizestr.indexOf('.');
      var dec = sizestr.substr(len + 1, 2);
      if (dec == '00') {
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    lastModifiedFilter(remote_lastModified) {
      let date2 = new Date(remote_lastModified);
      return date2.toLocaleString().substring(5, date2.toLocaleString().length);
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

#listpage .select-popper .el-select-dropdown__item {
  /* font-family: 'Montserrat' !important; */
}
#listpageBtnPanel {
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: rgb(212, 212, 212);
  border-radius: 8px;
}
.el-table::before {
  display: none;
}
.msgbox-fade-enter {
  opacity: 0;
}

.msgbox-fade-enter-active {
  transition: all 0s ease;
}

.msgbox-fade-leave-active {
  opacity: 0;
  transition: all 0.3s ease;
}
</style>
