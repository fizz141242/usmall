<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input placeholder="请输入用户名"></el-input>
      <el-input placeholder="请输入密码"></el-input>
      <div class="btn-parent">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
  <!-- -home  首页
 -menu 菜单管理
 -role 角色管理
 -manage 管理员管理
-cate 商品分类
-spec 商品规格
-goods 商品管理
-member 会员管理
-banner 轮播图管理
-seckill 秒杀活动  -->
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/");
    }
  },
  mounted() {}
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #423a52, #303c5f);
  position: relative;
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}
h3 {
  text-align: center;
  line-height: 60px;
}
.el-input {
  margin-bottom: 20px;
}
.btn-parent {
  text-align: center;
}
</style>