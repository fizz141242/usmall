<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">活动期限&nbsp;</span>
          <el-date-picker
            value-format="timestamp"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-form-item label="一级菜单" label-width="120px">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择活动区域"
            @change="changeFirst"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              @change="change"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级菜单" label-width="120px">
          <el-select v-model="form.second_cateid" @change="changeSeconda">
            <!-- @change="changePid" -->
            <el-option label="--请选择--" value disabled></el-option>

            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select
            v-model="form.goodsid"
            placeholder="请选择活动区域"
            @change="changePid"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in ThirdCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router/index";
import axios from "axios";
import qs from "qs";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqSeckAdd,
  reqSeckList,
  reqSeckUpdate,
  reqSeckInfo,
  reqSeckDel,
  reqCateList,
  reqGoodsList
} from "../../../utils/request";
import { reqMenuListOne } from "../../../../../../day9/mine/src/utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],

  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      // 定义数据
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      // 时间
      value1: [],
      // 二级分类列表
      secondCateList: [],
      ThirdCateList: []
    };
  },
  computed: {
    ...mapGetters({
      // 商品分类
      list: "cate/list"
      // 商品列表
    })
  },
  methods: {
    ...mapActions({
      // 商品分类列表
      reqListAction: "cate/reqListAction",
      reqSeckAction: "seck/reqListAction"
      // 商品列表
    }),
    // 清空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      (this.secondCateList = []), (this.attrList = []);
    },
    change() {
      this.form.begintime = this.value1[0]; //起始事件
      this.form.endtime = this.value1[1]; //结束事件
    },
    // 取消按钮
    cancel() {
      this.info.isshow = false;
    },
    // 判断菜单的修改
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 2;
      } else {
        this.form.type = 1;
      }
    },

    // // 一级分类发生了修改
    changeFirst() {
      this.form.second_cateid = "";
      this.form.goodsid = "";
      this.getSecondList();
    },
    // 二级分类发生了修改
    changeSeconda() {
      console.log(11);
      this.form.goodsid = "";
      this.getThirdList();
    },

    // 根据一级的id来获取二级的分类
    getSecondList() {
      reqCateList({
        pid: this.form.first_cateid
      }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    // 根据二级找三级
    getThirdList() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        this.ThirdCateList = res.data.list;
      });
    },
     checked() {
      return new Promise((resolve, reject) => {
        if (this.form.title === "") {
          errorAlert("活动名称不能为空");
          return;
        }
        if (this.form.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.form.goodsid === "") {
          errorAlert("商品不能为空");
          return;
        }
        if (!this.form.value1 ) {
          errorAlert("时间不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加
    add() {
      this.checked().then(() => {
        this.form.begintime = this.value1[0]; //起始事件
        this.form.endtime = this.value1[1]; //结束事件
        console.log(this.value1);
        reqSeckAdd(this.form).then(res => {
          console.log(this.form);
          if (res.data.code == 200) {
            this.cancel();
            successAlert("添加成功");
            this.empty();
            this.$emit("init");
            this.reqSeckAction();
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    },
    // 获取一条数据
    getOne(id) {
      reqSeckInfo(id).then(res => {
        (this.form = res.data.list), (this.form.id = id);
      });
    },
    look(id) {
      reqSeckUpdate(id).then(res => {
        var data1 = new Date(res.data.list.begintime * 1);
        var data2 = new Date(res.data.list.endtime * 1);
        this.value1 = [data1, data2];
        this.form = res.data.list;
        this.id = id;
        changeFirst();
        changeSeconda();
      });
    },
    // 点击修改
    update() {
      this.checked().then(() => {
        if (this.value1.length > 0) {
          var time1 = this.value1[0].getTime();
          this.form.begintime = time1;
          var time2 = this.value1[1].getTime();
          this.form.endtime = time2;
        }
        reqSeckUpdate(this.form).then(res => {
          if (res.data.code === 200) {
            this.cancel();
            successAlert("修改成功");
            this.empty();
            //   this.$emit("init");
            this.reqSeckAction();
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    // if(this.goodsList.length==0){
    //   this.reqSeckList();
    // }
    this.reqListAction();
    this.reqSeckAction();
  }
};
</script>
<style scoped>
.demonstration {
  margin-left: 56px;
}
</style>