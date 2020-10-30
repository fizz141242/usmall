<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="120px">
          <!-- multiple 表单中下拉菜单、input的type是file ,想要多选，设置 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in attrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isshow" id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加规格'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import E from "wangeditor";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqGoodsDetail,
  reqGoodsUpdate,
  reqCateList,
  reqGoodsAdd
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import Editor from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      // 定义数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      //二级分类的list
      secondCateList: [],
      // 规格属性的list
      attrList: [],
      // 上传图片的临时地址
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list"
    })
  },
  methods: {
    // 富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.edito.create();
      this.editor.txt.html(this.form.description);
    },
    // 验证
    checked() {
      return new Promise((resolve, reject) => {
        if(this.form.first_cateid===''){
          
        }
      });
    },
    // 一级分类发生了修改
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    // 根据一级的id来获取二级的分类
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    changeSpecs() {
      this.form.specsattr = [];
      this.getAttrsList();
    },
    getAttrsList() {
      let obj = this.specList.find(item => item.id === this.form.specsid);

      this.attrList = obj.attrs;
    },
    ...mapActions({
      // 请求分类的list
      getCateList: "cate/reqListAction",
      // 获取规格的list
      getSpecList: "spec/reqListAction",
      // 商品list
      getGoodsList: "goods/reqListAction",
      // 商品总数
      reqTotalAction: "goods/reqTotalAction"
    }),
    // 图片
    changeFile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件不能超过2M");
        return;
      }
      let arr = [".jpg", ".jpeg", ".png", "gif"];
      if (!arr.includes(file.name.slice(file.name.lastIndexOf(".")))) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //重置form
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      };
      // 二级分类的list
      this.secondCateList = [];
      // 规格属性的list
      this.attrList = [];
      // 上传图片的临时地址
      this.imgUrl = "";
    },
    // 取消按钮
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      this.form.description = this.editor.txt.html();
      let obj = {
        ...this.form
      };
      obj.specsattr = JSON.stringify(obj.specsattr);
      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }

      reqGoodsAdd(data).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          this.empty();
          successAlert("添加成功");
          // 刷新list
          this.getGoodsList();
          // 总数
          this.reqTotalAction();
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      // 获取一条数据请求
      reqGoodsDetail(id).then(res => {
        if (this.editor) {
          this.editor.txt.html(this.form.description);
        }
        this.form = res.data.list;
        // 补id
        this.form.id = id;
        // 根据一级分类获取二级列表
        this.getSecondList();
        // 图片
        this.imgUrl = this.$imgPre + this.form.img;
        // 根据规格获取属性值的列表
        this.getAttrsList();
        // form.specsattr 需要json.parse
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },

    // 点击修改
    update() {
      this.form.description = this.editor.txt.html();
      let obj = {
        ...this.form
      };
      obj.specsattr = JSON.stringify(obj.specsattr);
      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }
      reqGoodsUpdate(data).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          successAlert("修改成功");
          this.empty();
          this.getGoodsList();
        }
      });
    }
  },
  mounted() {
    // 分类请求
    this.getCateList();
    // 获取规格列表
    this.getSpecList(true);
  }
};
</script>
<style scoped>
.line {
  display: flex;
}
.ipt-box {
  flex: 1;
}
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
</style>