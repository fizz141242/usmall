<template>
  <div>
    <el-container class="wrapper">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                >
                  {{ i.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-else>
              <span slot="title">
                {{ item.title }}
              </span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          {{ userInfo.username }}
          <el-button type="primary" @click="logOut">退出</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  components: {},
  data() {
    return {};
  },

  methods: {
    ...mapActions(["changeUserInfoAction"]),
    logOut() {
      this.changeUserInfoAction({});
      this.$router.push("/login");
    }
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
.header{
  padding-top: 10px;
  padding-left: 1000px;
}
</style>