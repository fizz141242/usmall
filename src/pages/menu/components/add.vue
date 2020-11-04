<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="请选择活动区域"
            @change="changePid"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
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
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate
} from "../../../utils/request";
import { reqMenuListOne } from "../../../../../../day9/mine/src/utils/request";
export default {
  props: ["info", "list"],

  data() {
    return {
      // 定义数据
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      // 定义图标集合
      icons: [
        "el-icon-s-tools",
        "el-icon-message-solid",
        "el-icon-s-check",
        "el-icon-s-data"
      ],
      // 地址
      indexRoutes: indexRoutes
    };
  },
  methods: {
    // 清空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
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
      checked() {
      return new Promise((resolve, reject) => {
        if (this.form.title === "") {
          errorAlert("菜单名称不能为空");
          return;
        }
        if (this.form.pid === "") {
          errorAlert("上级菜单不能为空");
          return;
        }
        if (this.form.url === "") {
          errorAlert("菜单地址不能为空");
          return;
        }
      
      
        resolve();
      });
    },
    // 添加
    add() {
      this.checked().then(() => {
        reqMenuAdd(this.form).then(res => {
          console.log(this.form);
          if (res.data.code == 200) {
            this.cancel();
            successAlert("添加成功");

            this.empty();
            this.$emit("init");
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    },
    // 获取一条数据
    getOne(id) {
      reqMenuDetail(id).then(res => {
        (this.form = res.data.list), (this.form.id = id);
      });
    },
    // 点击修改
    update() {
      this.checked().then(() => {
        reqMenuUpdate(this.form).then(res => {
          if (res.data.code === 200) {
            this.cancel();
            successAlert("修改成功");
            this.empty();
            this.$emit("init");
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>