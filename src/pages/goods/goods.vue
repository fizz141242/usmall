<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list @edit="willUpdate($event)"></v-list>

    <v-add ref="add" :info="info"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import axios from "axios";
// import { reqCateList, reqManageCount } from "../../utils/request";

export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加规格"
      }
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加规格";
      this.$refs.add.empty();
    },
    willUpdate(id) {
      (this.info.isshow = true), (this.info.title = "编辑规格");
      this.$refs.add.getOne(id);
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>