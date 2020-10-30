<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加管理员'"
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
  reqRoleList,
  reqManageAdd,
  reqManageUpdate,
  reqManageDetail
} from "../../../utils/request";
export default {
  props: ["info", "list"],

  data() {
    return {
      // 定义数据
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      //   树形控件的数据
      roleList: []
    };
  },
  mounted() {
    reqRoleList().then(res => {
      if(res.data.code===200){
      this.roleList = res.data.list;
      }

    });
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    // 取消按钮
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      reqManageAdd(this.form).then(res => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          successAlert("添加成功");
          this.$emit("init");
        }
      });
    },
    // 获取一条数据
    getOne(uid) {
      reqManageDetail(uid).then(res => {
      
          this.form = res.data.list,
          this.form.password=''
          
        
      });
    },
    // 点击修改
    update() {
      console.log(this.form)
      reqManageUpdate(this.form).then(res => {
        if (res.data.code === 200) {
          this.cancel();
          successAlert("修改成功");
          this.empty();

          this.$emit("init");
        }
      });
    }
  }
};
</script>
<style scoped>
</style>