<!--
 * @Author: AmeroL
 * @Date: 2022-03-23 20:17:30
 * @LastEditors: AmeroL
 * @LastEditTime: 2022-03-24 23:46:42
 * @FilePath: \vue-storepage\src\views\listPageView.vue
 * @email: vian8416@163.com
-->

<template>
  <div id="listpage">
    <!-- <el-button type="primary" @click="addItem"> add</el-button> -->
    <el-button type="primary"
               plain
               @click="refreshList"
               icon="el-icon-notebook-2">Refresh list</el-button>
    <div id="tablePanel">
      <el-empty description="No Data"
                v-if="showEmpty"></el-empty>
      <el-table v-if="!showEmpty"
                :data="fileList"
                highlight-current-row
                @current-change="handleCurrentChange">
        <el-table-column label="Name"
                         property="name"
                         align="left"
                         min-width="260"
                         show-overflow-tooltip>
          <template slot-scope="scope">{{
            scope.row.name | nameFilter
          }}</template>
        </el-table-column>
        <el-table-column label="Size"
                         property="size"
                         align="left"
                         width="90"
                         min-width="120">
          <template slot-scope="scope">{{
            scope.row.size | sizeFilter
          }}</template>
        </el-table-column>
        <el-table-column label="Time"
                         prop="lastModified"
                         align="left"
                         width="120"
                         min-width="120">
          <template slot-scope="scope">{{
            scope.row.lastModified | lastModifiedFilter
          }}</template>
        </el-table-column>
        <el-table-column label="Url"
                         property="url"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="right"
                         min-width="230"
                         width="230">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="success"
                       icon="el-icon-copy-document"
                       @click="copyUrl(scope.row)"
                       v-clipboard:copy="scope.row.url">Copy</el-button>
            <el-button size="mini"
                       type="danger"
                       plain
                       icon="el-icon-delete"
                       @click="confirmDelete(scope.row)">
              Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { get, deleteItemOSS } from "../../public/ali-oss";
var INDEX = 1321;
export default {
  data: () => ({
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
    addItem () {
      let tempObj = new Object();
      tempObj.name = "321" + INDEX;
      tempObj.url = "dsa" + INDEX;
      tempObj.size = "32193821" + INDEX;
      tempObj.lastModified = "2022-03-23T14:46:38.000Z";
      INDEX++;
      this.fileList.push(tempObj);
    },
    refreshList () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      get().then((result) => {
        loading.close();
        this.fileList = result.objects;
        console.log(result);
      });
    },
    handleCurrentChange () { },
    copyUrl (option) {
      console.log(option);
      this.$message({
        type: "success",
        message: "The link has been copied to the clipboard!",
      });
    },
    confirmDelete (_option) {
      this.$confirm("Do you want to delete this file?", "Tip", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.deleteItem(_option);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Undelete!",
          });
        });
    },
    deleteListItem (_name) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].name == _name) {
          this.fileList.splice(i, 1);
        }
      }
    },
    deleteItem (option) {
      this.$message({
        type: "success",
        message: "Successfully deleted!",
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
    setEmptyPanel () {
      if (this.fileList.length == 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
    },
  },
  watch: {
    fileList: {
      handler () {
        this.setEmptyPanel();
      },
      deep: true,
    },
  },
  mounted () {
    this.refreshList();
    this.setEmptyPanel();
  },
  filters: {
    nameFilter (remote_filename) {
      let filenameArray = remote_filename.split("/");
      return filenameArray[filenameArray.length - 1];
    },
    sizeFilter (size) {
      var data = "";
      if (size < 0.1 * 1024) {
        data = size.toFixed(2) + "B";
      } else if (size < 1 * 1024 * 1024) {
        data = (size / 1024).toFixed(2) + "KB";
      } else if (size < 1 * 1024 * 1024 * 1024) {
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      var sizestr = data + "";
      var len = sizestr.indexOf(".");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    lastModifiedFilter (remote_lastModified) {
      let date2 = new Date(remote_lastModified);
      return date2.toLocaleString().substring(5, date2.toLocaleString().length);
    },
  },
};
</script>
<style>
.el-table::before {
  display: none;
}
#tablePanel {
}
</style>