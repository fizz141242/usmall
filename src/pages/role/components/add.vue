<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            ref="tree"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加角色'"
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
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/request";
export default {
  props: ["info"],

  data() {
    return {
      // 定义数据
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      //   树形控件的数据
      menuList: []
    };
  },
  mounted() {
    reqMenuList().then(res => {
      this.menuList = res.data.list;
    });
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
    },
    //清空树
    emptyTree() {
      this.$refs.tree.setCheckedKeys([]);
    },
    //弹框动画
    opened() {
      if (this.info.title === "添加角色") {
        this.emptyTree();
      }
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
        if (this.form.rolename === "") {
          errorAlert("角色名称不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加
    add() {
      this.checked().then(() => {
        if (this.form.rolename === "") {
          errorAlert("用户名称不能为空！");
          return;
        }
        if (this.$refs.tree.getCheckedKeys().length === 0) {
          errorAlert("角色必须分配权限");
          return;
        }
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.form).then(res => {
          if (res.data.code === 200) {
            this.cancel();
            this.empty();
            this.emptyTree();
            successAlert("添加成功");
            this.$emit("init");
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    },
    // 获取一条数据
    getOne(id) {
      reqRoleDetail(id).then(res => {
        if (res.data.code === 200) {
          (this.form = res.data.list), (this.form.id = id);
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
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