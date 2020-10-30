<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片" label-width="120px" >
          <div class="my-upload">
            <h3>+</h3>
            <img :src="imgUrl" alt="" v-if="imgUrl" />
            <input
              type="file"
              v-if="info.isshow"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item> -->
        <el-form-item label="图片" label-width="120px" v-if="form.pid !== 0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加分类'"
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      // 定义数据
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      //   树形控件的数据
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction"
    }),
    changeFile2(e){
      let file=e.raw
      this.imgUrl=URL.createObjectURL(file)
      this.form.img=file;
    },
    changeFile(e) {
      let file = e.target.files[0];
      //判断图片2M
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      //判断文件格式
      let imgArr = [".jpg", ".jpeg", ".png", ".gif"];
      let name = file.name;
      let extname = name.slice(name.lastIndexOf("."));
      if (!imgArr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      //   给form的img赋值
      this.form.img = file;
    },
    //重置form
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
      this.imgUrl = "";
    },
    // 取消按钮
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      // FormData
      // 1、将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
      // 2、异步上传文件
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateAdd(data).then(res => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          successAlert("添加成功");
          this.reqList();
          //   this.$emit("init");
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqCateDetail(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    // 点击修改
    update() {
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateUpdate(data).then(res => {
        if (res.data.code === 200) {
          this.cancel();
          successAlert("修改成功");
          this.empty();
          this.reqList();
        } else {
          errorAlert(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}

.my-upload .ipt {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}

.my-upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>