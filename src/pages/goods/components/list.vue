<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span>{{ scope.row.market_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="$imgPre + scope.row.img"
            alt=""
           
          />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
      <el-table-column label="操作" width=180px >
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
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
import { reqGoodsDel } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size:'goods/size'
    })
  },
  methods: {
    ...mapActions({
     reqList:'goods/reqListAction',
     reqTotalAction:'goods/reqTotalAction',
     changePageAction:'goods/changePageAction'
    }),

    // 修改页码
    changePage(page) {
      this.changePageAction(page);
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      reqGoodsDel(id).then(res => {
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqTotalAction();
        }
      });
    } 
  },
  mounted() {
    // 分类列表请求
    this.reqList()
    // 获取规格列表，修改状态层的请求的参数
    this.reqTotalAction()
  }
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>