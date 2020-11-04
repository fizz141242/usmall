<template>
  <div>
    <el-button type='primary' @click='willAdd'>添加</el-button>
    <v-list :list='list' @edit='willUpdate($event)' @init='getInit'></v-list>
    <v-add ref=add :info='info' :list='list' @init='getInit' ></v-add>
      <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total">
  </el-pagination>
  </div>
  
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'

import { reqManageList,reqManageCount } from '../../utils/request';
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info:{
        isshow:false,
        title:'添加管理员'
      },
      list:[],
      size:2,
      page:1,
      total:0
    };
  },
  methods: {
    willAdd(){
      this.info.isshow=true
      this.info.title='添加管理员'
      this.$refs.add.empty()
    },
    getInit(){
      reqManageCount().then((res)=>{
        if(res.data.code==200){
          this.total=res.data.list[0].total
        }
      })
      this.getList()
    },
    getList(){
      reqManageList({page:this.page,size:this.size}).then(res=>{
        let list=res.data.list?res.data.list:[]
        if(list.length===0&&this.page>1){
          this.page--;
          this.getList();
          return
        }
        this.list=list
    })
    },
    changePage(page){
      this.page=page;
      this.getList()
    },
    willUpdate(uid){
      this.info.isshow=true,
      this.info.title='编辑管理员'
      this.$refs.add.getOne(uid)
    }
  },
  mounted() {
    this.getInit();
  }
};
</script>
<style scoped>
</style>