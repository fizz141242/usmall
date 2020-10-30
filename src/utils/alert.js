import Vue from 'vue'
let vm =new Vue()
// 成功传值
export const successAlert = msg =>{
    vm.$message({
        message:msg,
        type:'success'
    })
}
// 失败传值
export const errorAlert = msg =>{
    vm.$message({
        message:msg,
        type:'warning'
    })
}