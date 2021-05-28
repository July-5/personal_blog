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
      <el-input placeholder="请输入内容" v-model="commentsearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchcomment"></el-button>
      </el-input>
      <el-button class="addbtn" type="success" @click="showCommentDialog" plain>添加评论</el-button>
    </div>
    <!-- 评论列表 -->
    <el-table :data="commentlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" class="tabcomments">
      <el-table-column fixed prop="commentID" label="编号" width="170">
      </el-table-column>
      <el-table-column prop="userID" label="评论者" width="220">
      </el-table-column>
      <el-table-column prop="articleID" label="评论文章" width="220">
      </el-table-column>
      <el-table-column prop="commentContent" label="评论内容" width="220">
      </el-table-column>
      <el-table-column prop="commentDate" label="评论时间" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <!-- 删除评论信息 -->
          <el-button type="danger" size="mini" @click="deletecomment(scope.row)" icon="el-icon-delete" circle></el-button>
          <!--修改评论信息  -->
          <el-button type="primary" icon="el-icon-edit" @click="editComment(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-pagination
          background layout="prev, pager, next"
          :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          :pager-count="5"  
          :total="commentlist.length"
        >
        </el-pagination>
    <!-- 添加评论 -->
    <el-dialog title="添加评论" :visible.sync="isShowAddComment" class="dialogStyle">
      <el-form :model="addCommentData">
        <el-form-item label="评论名">
          <el-input v-model="addCommentData.commentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论描述">
          <el-input v-model="addCommentData.commentDescription"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddComment=false">取 消</el-button>
        <el-button type="primary" @click="addCommentPost">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改评论 -->
    <el-dialog title="编辑评论" :visible.sync="isShoweditComment">
      <el-form :model="editCommentData">
        <el-form-item label="评论名">
          <el-input v-model="editCommentData.commentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论描述">
          <el-input v-model="editCommentData.commentDescription"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShoweditComment=false">取 消</el-button>
        <el-button type="primary" @click="editCommentPut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '评论列表',
        commentlist: [],
        pagesize: 7,//每页多少数据
        currentPage:1, //默认当前页为第一页
        commentsearch: '',
        // 添加评论需要的参数
        isShowAddComment: false,
        addCommentData: {
          userID: "",
          articleID: "",
          commentContent:"",
          commentDate:""
        },
        // 编辑评论
        isShoweditComment: false,
        editCommentData: {},
      }
    },
    methods: {
      // 展示添加评论的弹出窗口
      current_change(currentPage){  //改变当前页
             this.currentPage = currentPage
         },


      getusers(search = '') {
        //alert("search="+search);
        var url = '';
        if (search != '') {
          url = 'http://localhost:8014/comment?commentName_like='+ search;
        } else {
          url = 'http://localhost:8014/comment';
        }
        // alert("url="+url);
        this.$Axios.get(url)
          .then(backdata => {
            console.log(backdata.data);
            this.commentlist = backdata.data;
            console.log("............");
          });
      },
      searchcomment() {
         //alert(this.commentsearch);
        this.getusers(this.commentsearch);
      },
      deletecomment(row) {
        alert(row.commentID)
       this.$Axios({
         url:'http://localhost:8014/commentDele?id='+row.commentID,
         method:"get"
       }).then(backdata=>{
        console.log(backdata);
        if (backdata.status==220) {
          this.$message({message:backdata.statusText,type:"success"});
          this.getusers();
        } else{
          this.$message.error("删除失败！");
        }
       });
      },
      // 添加评论需要的方法
      showCommentDialog() {
        this.isShowAddComment = true;
      },
      // 添加评论发送post请求
      addCommentPost() {
       console.log(this.addCommentData)

        this.$Axios({
          url: 'http://localhost:8014/commentAdd',
          method: "post",
          data: this.addCommentData
        }).then(backdata => {
            this.isShowAddComment = false;
            alert('进来了')
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getusers("");
        });
      },
      // 编辑评论信息
      editComment(row){
        this.isShoweditComment=true;
        alert(row.commentID)
        this.$Axios.get('http://localhost:8014/commentUpdate/?id='+row.commentID)
          .then(backdata => {
            console.log(backdata.data);
            this.editCommentData = backdata.data[0];
            console.log("............");
          });
      },
      editCommentPut(){
        var userid=this.editCommentData.commentID;
        var urls="http://localhost:8014/commentUpdatedo/?id="+userid;
        this.$Axios({
          url:urls,
          method:"post",
          data:this.editCommentData
        }).then(backdata=>{
          if (backdata.status==220) {
            this.$message({
              message:"修改成功",
              type:"success"
            });
            this.isShoweditComment=false;
            this.getusers("");
          } else{
          }
        });
      }
    },
    mounted() {
      this.getusers(this.commentsearch);
      
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

  .tabcomments {
    width: 100%;
    line-height: 100px;
  }

  .addbtn {
    float: left;
    margin: 10px;
  }
</style>
