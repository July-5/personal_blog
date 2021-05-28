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
      <el-input placeholder="请输入内容" v-model="sortsearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchsort"></el-button>
      </el-input>
      <el-button class="addbtn" type="success" @click="showSortDialog" plain>添加分类</el-button>
    </div>
    <!-- 分类列表 -->
    <el-table :data="sortlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" class="tabsorts">
      <el-table-column fixed prop="sortID" label="编号" width="280">
      </el-table-column>
      <el-table-column prop="sortName" label="分类类别" width="380">
      </el-table-column>
      <el-table-column prop="sortDescription" label="分类描述" width="400">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">

        <template slot-scope="scope">
          <!-- 删除分类信息 -->
          <el-button type="danger" size="mini" @click="deletesort(scope.row)" icon="el-icon-delete" circle></el-button>
          <!--修改分类信息  -->
          <el-button type="primary" icon="el-icon-edit" @click="editSort(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          background layout="prev, pager, next"
          :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          :pager-count="5"  
          :total="sortlist.length"
        >
        </el-pagination>
    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="isShowAddSort" class="dialogStyle">
      <el-form :model="addSortData">
        <el-form-item label="分类名">
          <el-input v-model="addSortData.sortName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="addSortData.sortDescription"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddSort=false">取 消</el-button>
        <el-button type="primary" @click="addSortPost">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改分类 -->
    <el-dialog title="编辑分类" :visible.sync="isShoweditSort">
      <el-form :model="editSortData">
        <el-form-item label="分类名">
          <el-input v-model="editSortData.sortName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="editSortData.sortDescription"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShoweditSort=false">取 消</el-button>
        <el-button type="primary" @click="editSortPut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '分类列表',
        sortlist: [],
        pagesize:7,//每页多少数据
        currentPage:1, //默认当前页为第一页
        sortsearch: '',
        // 添加分类需要的参数
        isShowAddSort: false,
        addSortData: {
          sortName: "",
          sortDescription: "",
        },
        // 编辑分类
        isShoweditSort: false,
        editSortData: {},
      }
    },
    methods: {
      // 展示添加分类的弹出窗口
       current_change(currentPage){  //改变当前页
             this.currentPage = currentPage
       },
      getusers(search = '') {
        //alert("search="+search);
        var url = '';
        if (search != '') {
          url = 'http://localhost:8014/sort?sortName_like='+ search;
        } else {
          url = 'http://localhost:8014/sort';
        }
        // alert("url="+url);
        this.$Axios.get(url)
          .then(backdata => {
            console.log(backdata.data);
            this.sortlist = backdata.data;
            console.log("............");
          });
      },
      searchsort() {
         //alert(this.sortsearch);
        this.getusers(this.sortsearch);
      },
      deletesort(row) {
        alert(row.sortID)
       this.$Axios({
         url:'http://localhost:8014/sortDele?id='+row.sortID,
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
      // 添加分类需要的方法
      showSortDialog() {
        this.isShowAddSort = true;
      },
      // 添加分类发送post请求
      addSortPost() {
       console.log(this.addSortData)

        this.$Axios({
          url: 'http://localhost:8014/sortAdd',
          method: "post",
          data: this.addSortData
        }).then(backdata => {
            this.isShowAddSort = false;
            alert('进来了')
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getusers("");
        });
      },
      // 编辑分类信息
      editSort(row){
        this.isShoweditSort=true;
        alert(row.sortID)
        this.$Axios.get('http://localhost:8014/sortUpdate/?id='+row.sortID)
          .then(backdata => {
            console.log(backdata.data);
            this.editSortData = backdata.data[0];
            console.log("............");
          });
      },
      editSortPut(){
        var userid=this.editSortData.sortID;
        var urls="http://localhost:8014/sortUpdatedo/?id="+userid;
        this.$Axios({
          url:urls,
          method:"post",
          data:this.editSortData
        }).then(backdata=>{
          if (backdata.status==200) {
            this.$message({
              message:"修改成功",
              type:"success"
            });
            this.isShoweditSort=false;
            this.getusers("");
          } else{
          }
        });
      }
    },
    mounted() {
      this.getusers(this.sortsearch);
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

  .tabsorts {
    width: 100%;
    line-height: 100px;
  }

  .addbtn {
    float: left;
    margin: 10px;
  }
</style>
