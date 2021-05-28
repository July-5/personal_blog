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
      <el-input placeholder="请输入内容" v-model="articlesearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searcharticle"></el-button>
      </el-input>
      <!-- 页面跳转事件 -->
      <el-button class="addbtn" type="success" @click="addArticle" plain>添加文章</el-button>
    </div>
    <!-- 文章列表 -->
    <el-table :data="articlelist.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" class="tabarticles">
      <el-table-column fixed prop="articleID" label="编号" width="170">
      </el-table-column>
      <el-table-column prop="sortID" label="分类" width="300">
      </el-table-column>
      <el-table-column prop="articleTitle" label="标题" width="300">
      </el-table-column>
      <el-table-column prop="articleDate" label="修改时间" width="300">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- 删除文章信息 -->
          <el-button type="danger" size="mini" @click="deletearticle(scope.row)" icon="el-icon-delete" circle></el-button>
          <!--修改文章信息，页面跳转并赋值,待完善-->
          <el-button type="primary" icon="el-icon-edit" @click="editarticle(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          background layout="prev, pager, next"
          :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          :pager-count="5"  
          :total="articlelist.length"
        >
        </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '文章列表',
        articlelist: [],
        pagesize:7,//每页多少数据
        currentPage:1, //默认当前页为第一页
        articlesearch: '',
        // 编辑文章
        editarticleData: {},
      }
    },
    methods: {
      // 展示添加文章的弹出窗口
      current_change(currentPage){  //改变当前页
             this.currentPage = currentPage
      },
      getarticles(search = '') {
        var url = '';
        if (search != '') {
          url = 'http://localhost:8014/article?articleTitle_like='+ search;
        } else {
          url = 'http://localhost:8014/article';
        }
        // alert("url="+url);
        this.$Axios.get(url)
          .then(backdata => {
            console.log(backdata.data);
            this.articlelist = backdata.data;
            console.log("............");
          });
      },
      searcharticle() {
         //alert(this.articlesearch);
        this.getarticles(this.articlesearch);
      },
      deletearticle(row) {
        alert(row.articleID)
       this.$Axios({
         url:'http://localhost:8014/articleDele?id='+row.articleID,
         method:"get"
       }).then(backdata=>{
        console.log(backdata);
        if (backdata.status==200) {
          this.$message({message:backdata.statusText,type:"success"});
          this.getarticles();
        } else{
          this.$message.error("删除失败！");
        }
       });
      },
      // 添加文章,点击跳转页面
      addArticle() {
        this.$router.push('/markdown')
      },
      // 传递文章信息，且跳转至修改页面
      editarticle(row){
        alert(row.articleID)
        this.$Axios.get('http://localhost:8014/articleUpdate/?id='+row.articleID)
          .then(backdata => {
            console.log(backdata.data);
            this.editarticleData = backdata.data[0];
            this.$router.push({path:'/updatemd',query:{data:this.editarticleData}})
            console.log("............");
          });
      },
    },
    mounted() {
      this.getarticles(this.articlesearch);
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

  .tabarticles {
    width: 100%;
    line-height: 100px;
  }

  .addbtn {
    float: left;
    margin: 10px;
  }
</style>
