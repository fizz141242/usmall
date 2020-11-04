<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="$imgPre + scope.row.img"
            alt=""
            v-if="scope.row.img !== 'null'"
          />
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
          <!-- <el-button type='danger' @click='del(scope.row.id)'>删除</el-button> -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqBannerDel } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqListAction"
    }),
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      reqBannerDel(id).then(res => {
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.reqList();
        }
      });
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>