<template>
  <div id="main" class="box"></div>
</template>
<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let myChart = echarts.init(document.getElementById("main"));
          var option = {
            tiele: {
              text: "商品分类详情"
            },
            tooltip: {},
            legend: {
              data: ["子分类数量"]
            },
            xAxis: {
              data: this.list.map(item => item.catename)
            },
            yAxis: {},
            series: [
              {
                data: "子分类数量",
                type: "line",
                data: this.list.map(item => (item.children ? item.children.length : 0))
              }
            ]
          };
          myChart.setOption(option);
        }
      },
      deep: true
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction"
    })
  },
  mounted() {
    this.reqList();
  }
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 400px;
  background: white;
  margin: 0px auto;
}
</style>