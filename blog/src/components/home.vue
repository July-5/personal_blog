<template>
  <el-container>
    <el-header>
      <el-menu default-active="/" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
        <el-menu-item index="/">
          <i class="el-icon-house"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="sort">
          <i class="el-icon-copy-document"></i>
          <span>分类</span>
        </el-menu-item>
        <el-menu-item index="label">
          <i class="el-icon-price-tag"></i>
          <span>标签</span>
        </el-menu-item>
        <el-menu-item index="self">
          <i class="el-icon-user"></i>
          <span>我的</span>
        </el-menu-item>
        <el-menu-item index="login" v-show="isL">
          <span>登录</span>
        </el-menu-item>
        <el-menu-item index="register" v-show="isL">
          <span>注册</span>
        </el-menu-item>
      </el-menu>
      <div class="exitlocation" v-show="isS">
        <div style="width:200px; height:78px;line-height:78px; margin:0 auto">
          <span>{{msg}}</span>
        </div>
        <el-button circle class="exitbtn"  @click="exit()">
          <i class="el-icon-close" ></i>
        </el-button>
      </div>
      <div class="searchbar">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searcharticle"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-container class="mainlocation">
        <div class="locationlimit">
            <div class="maincontainer">
                  <!-- 添加样式，划分边界（宽度），再进行页面布局，最后要去掉高度，让其自然循环，由内容决定高度 -->
              <div class="contentcard animate__animated animate__fadeInLeft" v-for="(item,index) in articlelist" :key="index+100" @click="detaillink(item.articleID)">
                <div class="left">
                  <div class="lefttop">
                    <span style="font-size:24px" class="titlelink">{{item.articleTitle}}</span>
                  </div>
                  <div class="leftmian" style="color: #00b5ad;">
                    <i class="el-icon-date"></i><span>{{item.articleDate}}</span>
                    <i class="el-icon-view"></i><span>{{item.articleView}}</span>
                  </div>
                  <div class="leftfoot" style="color: #00b5ad;" >
                    <i class="el-icon-price-tag"></i>
                    <!-- <span>标签</span> -->
                  </div>
                </div>
                <div class="right">
                  <el-button size="mini" style="border-color:#00b5ad">
                    <span style="color:#00b5ad">{{item.sortName}}</span>
                  </el-button>
                  <img src="../../static/img/test.jpg" alt="" class="imgSnow" >
                </div>
            </div>
          </div>

          <div class="mainaside">
            <el-card class="box-card animate__animated animate__fadeInRight">
              <div slot="header" class="clearfix">
                <i class="el-icon-copy-document"></i>
                <span>分类</span>
              </div>
              <div>
                <div v-for="value in sortlist" :key="value.sortID+28" class="text item">
                {{value.sortName}}
                <hr/>
              </div>
              </div>
            </el-card>
            <el-card class="box-card animate__animated animate__fadeInRight">
              <div slot="header" class="clearfix">
                <i class="el-icon-price-tag"></i>
                <span>标签</span>
              </div>
              <div>
                <div v-for="v in labellist" :key="v.labelID+20" class="text item">
                {{v.labelName}}
                <hr/>
              </div>
              </div>
            </el-card>
          </div>
        </div>
    </el-container>

    <el-footer>
      <span>Copyright ©2020-2021 G Blog By GCY</span><br>
      <span>津ICP备20393507号</span>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      search:'',
      articlelist: [],
      labellist: [],
      sortlist: [],
      labelforarticle:[],
      value:'',
      articleData:{},
      msg:'xxx',
      isL:false,
      isS:false
    }
  },
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    detaillink(k){
      this.$Axios.get('http://localhost:8014/articleUpdate/?id='+k)
          .then(backdata => {
            console.log(backdata.data);
            this.articleData = backdata.data[0];
            this.articleData.articleView +=1;
            this.$router.push({path:'/detail',query:{data:JSON.stringify(this.articleData)}})
            console.log("............");
          });
    },
    searcharticle(search = '') {
      //alert('点击了')
      this.$Axios({
         url:'http://localhost:8014/homePage?articleTitle_like='+ this.search,
         method:"get"
       }).then(backdata=>{
         this.articlelist = backdata.data;
       });
      },
    exit(){
          this.isShowD = true;
       // 1.删除localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('loginusername');
                // 2.消息提示框
          this.$message({type:"success",message:"退出系统"});
                // 3.页面跳转
          this.$router.push("/self");
        },
  },
  mounted(){
        this.$Axios({
          url:'http://localhost:8014/homePage',
          method:"get"
        }).then(backdata=>{
          this.articlelist = backdata.data;
        });

        this.$Axios({
          url:'http://localhost:8014/sort',
          method:"get"
        }).then(backdata=>{
          this.sortlist = backdata.data;
        });

        this.$Axios({
          url:'http://localhost:8014/label',
          method:"get"
        }).then(backdata=>{
          this.labellist = backdata.data;
        });

        // this.$Axios({
        //   url:'http://localhost:8014/labelPage/?id='+this.articlelist.articleID,
        //   method:"get"
        // }).then(backdata=>{
        //   this.labelforarticle = backdata.data;
        //   console.log(this.labelforarticle)
        // });

        let token = localStorage.getItem("loginusername");
        console.log(token)
        if(token == null){
          this.isL = true;
        }else{
          this.isS = true;
          this.msg = token;
        }
      },
}
</script>
<style>
  body {
    display: block;
    margin: 0;
  }
  
  .el-header{
    margin-top: -58px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:#545c64;
    color: #333;
    text-align: center;
    line-height: 62px;
  }

  .el-footer {
    background-color:#545c64;
    color :#fff;
    text-align: center;
    height: 60px;
    line-height: 30px;
  }
  
  .imgSnow{
    width: 250px;
    height: 150px;
    justify-content: flex-start;
    border-radius: 5px;
  }

  .el-menu-demo{
    margin-top: 2px;
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .input-with-select{
    background-color: #fff;
    width: 60%;
    margin-right: 80px;
    float: left;
    border-radius: 5px;
  }

  .mainlocation{
    background-image: url('../../static/img/bg.jpg');
    width: 100%;
  }

  .mainlocation .locationlimit{
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .mainlocation .maincontainer{
    width: 64%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .mainlocation .mainaside{
    width: 34%;
    height: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix{
    color: #0caeee;
    display: flex;
    justify-content: flex-start;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
    margin: 50px 0;
    height: 450px;
  }

  .contentcard{
    width: 790px;
    height: 250px;
    border: 1px solid transparent;
    border-radius: 5px;
    margin: 50px 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    box-shadow:0px 5px 5px 3px #ccc;
  }

  .contentcard:hover{
    box-shadow:0px 12px 5px 3px #ccc;
    transition: all .25s cubic-bezier(.02,.01,.47,1);
  }

  .contentcard .left{
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .contentcard .left .lefttop .titlelink:hover{
      cursor: pointer;
      color: #1dc884;
  }

  .contentcard .right{
    width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }

  .exitlocation{
    width: 150px;
    margin: 0 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
  }

  .elmenubtn{
    width:30px;
    height:30px;
    border-radius: 50%;
    margin: 0 0;
  }

</style>