<template>
    <el-container>
            <el-header>
                <el-menu default-active="login" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
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
                <el-menu-item index="login">
                    <span>登录</span>
                </el-menu-item>
                <el-menu-item index="register">
                    <span>注册</span>
                </el-menu-item>
                </el-menu>
                <div class="searchbar">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-header>
        <div class="mainlocationlog">
            <el-form ref="form" v-bind:model="form" :rules="user_rules" label-width="80px" class="login-from">
               <h1>登录</h1>
               <el-form-item  label="用户名" prop="username">
                   <el-input type="text" v-model="form.username" style="width:360px"></el-input>
                 </el-form-item>
               <el-form-item label-position="top" label="密码" prop="password">
                   <el-input type="password" v-model="form.password" style="width:360px"></el-input>
                 </el-form-item>
             <el-form-item>
                   <el-button class="loginbtn" @click="onsubmit">登录</el-button>
                 </el-form-item>
            </el-form>
        </div>
        <el-footer>
            <span>Copyright ©2020-2021 G Blog By GCY</span><br>
            <span>津ICP备20393507号</span>
    </el-footer>
    </el-container>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    data(){
        return{
            search:'',
            form: {
                username: '',
                password: ''
            },
            user_rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                    },
                    {
                    min: 3,
                    max: 10,
                    message: '长度在 3 到 10 个字符',
                    trigger: 'blur'
                    }
                ],
                password: [{
                    required: true,
                    message: '请输入用户密码',
                    trigger: 'blur'
                    },
                    {
                    min: 6,
                    max: 12,
                    message: '长度在 3 到 10 个字符',
                    trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        onsubmit() {
        // 发送axios的post请求
        var urlstr = "http://localhost:8014/users?username=" + this.form.username + "&password=" + this.form.password;
        console.log(urlstr);
        this.$Axios.get(urlstr)
          .then(backdata => {
            if (backdata.data.length!=0) {
              this.$message({
                message:"登录成功！",
                type:"success"
              });
              localStorage.setItem('token',backdata.data[0].userID);
              localStorage.setItem('loginusername',backdata.data[0].userName);
              this.$router.push({path:'/self'});
            } else{
              this.$message.error("用户名或密码错误，请重新输入！");
            }
          });
          //alert('点击了')
        }
    }
}
</script>
<style>
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

  .mainlocationlog{
    background-image: url('../../static/img/bg.jpg');
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-from{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .login-from h1{
      text-align: center;
      margin-top: -27px;
      margin-left: 60px;
  }

  .loginbtn{
      background-color: #009688;
      color: #fff;
      border-color: #009688;
      width: 400px;
  }

  .loginbtn:hover{
      background-color: #30a89c;
      color: #fff;
      border-color: #30a89c;
  }

</style>