<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqSpecDel } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      size: "spec/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",
      changePageAction: "spec/changePageAction"
    }),
    // 修改页码
    changePage(page) {
      this.changePageAction(page);
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del2(id) {
      reqSpecDel(id).then(res => {
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqTotalAction();
        }
      });
    },
    // 删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发请求删除数据
          reqSpecDel(id).then(res => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              this.reqList();
            }
          });
        })
        // 取消删除
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.reqList();
    this.reqTotalAction();
  }
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>