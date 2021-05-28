<template>
  <div>
    <el-container>
      <el-header style="background-color:#304156;">
        <el-row>
          <el-col :span="5">
            <img src="../../assets/logo.png" height="60px" />
          </el-col>
          <el-col :span="15">
           <span style="font-size: 24px; color:#ccc"><strong>个人博客后台管理系统</strong></span>
          </el-col>
          <el-col :span="4">
            <span style="color:#ccc">欢迎管理员：{{msg}}登录！</span>
            <el-button style="background-color:#001528" icon="el-icon-close"  circle @click="exit()"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container style="background-color:#304156;">
        <div class="asidew">
           <el-menu style="background-color:#304156; color:#fff" default-active="2" class="el-menu-vertical-demo elmenuClass" @open="handleOpen" @close="handleClose" router>
               <el-submenu index="1" class="elsu">
                 <template slot="title">
                   <i class="el-icon-user"></i>
                   <span>用户管理</span>
                 </template>
                 <el-menu-item-group style="background-color:#1f2d3d;">
                   <el-menu-item index="users">
                     <i class="el-icon-menu"></i>
                     用户列表</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>
               <el-submenu index="2">
                 <template slot="title">
                   <i class="el-icon-document"></i>
                   <span>博客管理</span>
                 </template>
                 <el-menu-item-group style="background-color:#1f2d3d;">
                   <el-menu-item index="articles" >
                     <i class="el-icon-menu"></i>
                     博客列表</el-menu-item>
                   <el-menu-item index="markdown">
                      <i class="el-icon-menu"></i>
                     博客发布</el-menu-item>
                    <el-menu-item index="updatemd">
                      <i class="el-icon-menu"></i>
                     博客修改</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>


               <el-submenu index="3">
                 <template slot="title">
                   <i class="el-icon-edit"></i>
                   <span>评论管理</span>
                 </template>
                 <el-menu-item-group style="background-color:#1f2d3d;">
                   <el-menu-item index="comments">
                     <i class="el-icon-menu"></i>
                     评论列表</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>

               <el-submenu index="4">
                 <template slot="title">
                   <i class="el-icon-copy-document"></i>
                   <span>分类管理</span>
                 </template>
                 <el-menu-item-group style="background-color:#1f2d3d;">
                   <el-menu-item index="sorts">
                     <i class="el-icon-menu"></i>
                     分类列表</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>
               
               <el-submenu index="5">
                 <template slot="title">
                   <i class="el-icon-price-tag"></i>
                   <span>标签管理</span>
                 </template>
                 <el-menu-item-group style="background-color:#1f2d3d;">
                   <el-menu-item index="labels">
                     <i class="el-icon-menu"></i>
                     标签列表</el-menu-item>
                 </el-menu-item-group>
               </el-submenu>
             </el-menu>
        </div>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    },
    methods:{
      handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },
      exit(){
       // 1.删除localStorage
          localStorage.removeItem('loginuserid');
          localStorage.removeItem('loginusername');
                // 2.消息提示框
          this.$message({type:"success",message:"退出系统"});
                // 3.页面跳转
          this.$router.push("/login");
      }
    },
    mounted() {
      var loginuserid = localStorage.getItem('loginuserid');
      var loginusername = localStorage.getItem('loginusername');
      // console.log(!loginusername);
      if (!loginuserid) {
        this.$router.push({
          path: '/login'
        });
      } else {
        this.msg = loginusername;
      }
    }
  }
</script>

<style scoped>
  .el-header{
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 80px;
    min-height: 660px;
  }

  .asidew{
    width: 200px;
  }

  .elmenuClass{
    color: #ccc;
  }

  .el-submenu__title:hover {
    background-color: #263445;
}

  .el-menu-item{
    color: #fff;
  }

  .el-menu-item:hover{
    background-color:#001528;
  }

  .el-menu-item:active{
    background-color:#001528;
  }

  .elmenuClass span{
    color: #fff;
  }
</style>
