<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
     
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqRoleDel,reqManageDel } from "../../../utils/request";
export default {
  props: ["list"],
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除
    del(uid) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发请求删除数据
          reqManageDel(uid).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              this.$emit('init')
            }else{
              errorAlert(res.data.msg)
            }
          });
        })
        // 取消删除
        .catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>