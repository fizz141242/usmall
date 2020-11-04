<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="info.title == '添加角色'"
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
  reqMemberList,
  reqMemberInfo,
  reqRoleDetail,
  reqMemberEdit
} from "../../../utils/request";
export default {
  props: ["info"],

  data() {
    return {
      // 定义数据
      form: {
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      }
    };
  },
  mounted() {
    reqMemberList().then(res => {
      this.menuList = res.data.list;
    });
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
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
        if (this.form.phone === "") {
          errorAlert("手机号不能为空");
          return;
        }
        if (this.form.nickname === "") {
          errorAlert("昵称不能为空");
          return;
        }
        if (this.form.password === "") {
          errorAlert("密码不能为空");
          return;
        }
        
        
     
        resolve();
      });
    },
    // 获取一条数据
    getOne(uid) {
      reqMemberInfo(uid).then(res => {
        if (res.data.code === 200) {
          (this.form = res.data.list), (this.form.uid = uid);
          // this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    // 点击修改
    update() {
      this.checked().then(() => {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleUpdate(this.form).then(res => {
          if (res.data.code === 200) {
            this.cancel();
            successAlert("修改成功");
            this.empty();
            this.emptyTree();
            this.$emit("init");
          }
        });
      });
    }
  }
};
</script>
<style scoped>
</style>