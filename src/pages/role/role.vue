<template>
  <div>
    <el-button type='primary' @click='willAdd'>添加</el-button>
    <v-list :list='list' @edit='willUpdate($event)' @init='getInit'></v-list>
    <v-add ref=add :info='info' @init='getInit'></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
import axios from 'axios'
import { reqRoleList } from '../../../../../day9/mine/src/utils/request';
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info:{
        isshow:false,
        title:'添加角色'
      },
      list:[]
    };
  },
  methods: {
    willAdd(){
      this.info.isshow=true
      this.info.title='添加角色'
      this.$refs.add.empty()
    },
    getInit(){
      reqRoleList().then((res)=>{
        if(res.data.code==200){
          this.list=res.data.list
        }
      })
    },
    willUpdate(id){
      this.info.isshow=true,
      this.info.title='编辑角色'
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    this.getInit();
  }
};
</script>
<style scoped>
</style>