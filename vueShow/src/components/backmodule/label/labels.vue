<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div class="searchbar">
      <el-input placeholder="请输入内容" v-model="labelsearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchlabel"></el-button>
      </el-input>
      <el-button class="addbtn" type="success" @click="showLabelDialog" plain>添加标签</el-button>
    </div>
    <!-- 标签列表 -->
    <el-table :data="labellist.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" class="tablabels">
      <el-table-column fixed prop="labelID" label="编号" width="300">
      </el-table-column>
      <el-table-column prop="labelName" label="标签类别" width="600">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <!-- 删除标签信息 -->
          <el-button type="danger" size="mini" @click="deletelabel(scope.row)" icon="el-icon-delete" circle></el-button>
          <!--修改标签信息  -->
          <el-button type="primary" icon="el-icon-edit" @click="editLabel(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          background layout="prev, pager, next"
          :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          :pager-count="5"  
          :total="labellist.length"
        >
        </el-pagination>
    <!-- 添加标签 -->
    <el-dialog title="添加标签" :visible.sync="isShowAddLabel" class="dialogStyle">
      <el-form :model="addLabelData">
        <el-form-item label="标签名">
          <el-input v-model="addLabelData.labelName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddLabel=false">取 消</el-button>
        <el-button type="primary" @click="addLabelPost">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改标签 -->
    <el-dialog title="编辑标签" :visible.sync="isShoweditLabel">
      <el-form :model="editLabelData">
        <el-form-item label="标签名">
          <el-input v-model="editLabelData.labelName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShoweditLabel=false">取 消</el-button>
        <el-button type="primary" @click="editLabelPut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '标签列表',
        labellist: [],
        pagesize:7,//每页多少数据
        currentPage:1,  //默认当前页为第一页
        labelsearch: '',
        // 添加标签需要的参数
        isShowAddLabel: false,
        addLabelData: {
          labelName: "",
        },
        // 编辑标签
        isShoweditLabel: false,
        editLabelData: {},
      }
    },
    methods: {
      // 展示添加标签的弹出窗口
      current_change(currentPage){  //改变当前页
             this.currentPage = currentPage
      },
      getusers(search = '') {
        //alert("search="+search);
        var url = '';
        if (search != '') {
          url = 'http://localhost:8014/label?labelName_like='+ search;
        } else {
          url = 'http://localhost:8014/label';
        }
        // alert("url="+url);
        this.$Axios.get(url)
          .then(backdata => {
            console.log(backdata.data);
            this.labellist = backdata.data;
            console.log("............");
          });
      },
      searchlabel() {
         //alert(this.labelsearch);
        this.getusers(this.labelsearch);
      },
      deletelabel(row) {
        alert(row.labelID)
       this.$Axios({
         url:'http://localhost:8014/labelDele?id='+row.labelID,
         method:"get"
       }).then(backdata=>{
        console.log(backdata);
        if (backdata.status==200) {
          this.$message({message:backdata.statusText,type:"success"});
          this.getusers();
        } else{
          this.$message.error("删除失败！");
        }
       });
      },
      // 添加标签需要的方法
      showLabelDialog() {
        this.isShowAddLabel = true;
      },
      // 添加标签发送post请求
      addLabelPost() {
       console.log(this.addLabelData)

        this.$Axios({
          url: 'http://localhost:8014/labelAdd',
          method: "post",
          data: this.addLabelData
        }).then(backdata => {
            this.isShowAddLabel = false;
            alert('进来了')
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getusers("");
        });
      },
      // 编辑标签信息
      editLabel(row){
        this.isShoweditLabel=true;
        alert(row.labelID)
        this.$Axios.get('http://localhost:8014/labelUpdate/?id='+row.labelID)
          .then(backdata => {
            console.log(backdata.data);
            this.editLabelData = backdata.data[0];
            console.log("............");
          });
      },
      editLabelPut(){
        var labelid=this.editLabelData.labelID;
        var urls="http://localhost:8014/labelUpdatedo/?id="+labelid;
        this.$Axios({
          url:urls,
          method:"post",
          data:this.editLabelData
        }).then(backdata=>{
          if (backdata.status==200) {
            this.$message({
              message:"修改成功",
              type:"success"
            });
            this.isShoweditLabel=false;
            this.getusers("");
          } else{
          }
        });
      }
    },
    mounted() {
      this.getusers(this.labelsearch);
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .searchbar {
    width: 100%;
    position: relative;
  }

  .input-with-select {
    background-color: #fff;
    width: 50%;
    margin: 10px;
    float: left;
  }

  .tablabels {
    width: 100%;
    line-height: 100px;
  }

  .addbtn {
    float: left;
    margin: 10px;
  }
</style>
