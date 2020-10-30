<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="line">
            <div class="ipt-box">
              <el-input autocomplete="off" v-model="item.val"></el-input>
            </div>

            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增规格属性</el-button
            >

            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加规格'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqSpecAdd,
  reqSpecDetail,
  reqSpecUpdate
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      // 定义数据
      form: {
        specsname: "",
        attrs: "[]",
        status: 1
      },
      attrArr: [{ val: "" }]
    };
  },
  computed: {
    ...mapGetters({
      list: "spec/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      // reqTotalAction:'spec/reqTotalAction'
    }),
    addArr() {
      this.attrArr.push({ val: "" });
    },
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    //重置form
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1
      };
      this.attrArr = [{ val: "" }];
    },
    // 取消按钮
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.val));
      reqSpecAdd(this.form).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          this.empty();
          successAlert("添加成功");
          // 刷新list
          this.reqList();
          // 总数
          // this.reqTotalAction()
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqSpecDetail(id).then(res => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map(item => ({ val: item }));
      });
    },
    // 点击修改
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.val));

      reqSpecUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("修改成功");
          this.empty();
          this.reqList();
        }
      });
    }
  }
};
</script>
<style  scoped>
.line {
  display: flex;
}

.ipt-box {
  flex: 1;
}
</style>