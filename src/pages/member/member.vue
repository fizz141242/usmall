<template>
  <div>
    <v-list :list='list' @edit='willUpdate($event)' @init='getInit'></v-list>
    <v-add ref=add :info='info' @init='getInit'></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
import axios from 'axios'
import { reqMemberList } from '../../utils/request';
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
    getInit(){
      reqMemberList().then((res)=>{
        if(res.data.code==200){
          this.list=res.data.list
        }
      })
    },
    willUpdate(id){
      this.info.isshow=true,
      this.info.title='会员编辑'
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