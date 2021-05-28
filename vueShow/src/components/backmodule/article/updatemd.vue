<template>
  <div>
      <el-form ref="form" :model="editarticleData" label-width="80px">
        <el-form-item>
          <el-input v-model="editarticleData.articleTitle" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
        <!-- <vue-editor v-model="text" style="height:430px"></vue-editor> -->
        <div id="editor">
          <mavon-editor style="height: 414px" v-model="editarticleData.articleContent" :ishljs="true" ref="md"></mavon-editor>
        </div>
        </el-form-item>
        <div class="checkSelect">
          <el-form-item>
            <el-select v-model="editarticleData.sortID" placeholder="分类" style="width:280px" @focus="getsorts">
              <el-option v-for="item in sorts" :key="item.sortID" :label="item.sortName" :value="item.sortID">{{item.sortName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <div class="block">
                <el-date-picker v-model="editarticleData.articleDate" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </div>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="labelName" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
              <el-option v-for="item in labels" :key="item.labelID" :label="item.labelName" :value="item.labelName"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="btnLocation">
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import moment from 'moment'
  export default {
    name: "Write",
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        labels: [],
        sorts: [],
        labelName:[],
        editarticleData: {}
      }
    },
    methods: {
      getsorts() {
        //alert('进来了')
       this.$Axios({
         url:'http://localhost:8014/sort',
         method:"get"
       }).then(backdata=>{
         this.sorts = backdata.data
       });
      },
      onSubmit() {
        var articleid=this.editarticleData.articleID;
        var urls="http://localhost:8014/articleUpdatedo/?id="+articleid;
        this.$Axios({
          url:urls,
          method:"post",
          data:this.editarticleData
        }).then(backdata=>{
          if (backdata.status==200) {
            this.$message({
              message:"修改成功",
              type:"success"
            });
            this.$router.push('/articles')
          }
        });
      }
    },
    created() {
        //alert('进来了')
       this.$Axios({
         url:'http://localhost:8014/label',
         method:"get"
       }).then(backdata=>{
         this.labels = backdata.data
       });
    },
    components: {
        mavonEditor
    },
    mounted(){
      //console.log(this.$route.query.data)
      this.editarticleData = this.$route.query.data
    }
  }
</script>
<style>
  .checkSelect{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btnLocation{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>