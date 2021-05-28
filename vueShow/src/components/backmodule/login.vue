<template>
  <div class="login-wrap">
     <el-form ref="form" v-bind:model="form" :rules="user_rules" label-width="80px" class="login-from">
         <h2>用户登录</h2>
         <el-form-item  label="用户名" prop="username">
           <el-input type="text" v-model="form.username"></el-input>
         </el-form-item>
       <el-form-item label-position="top" label="密码" prop="password">
           <el-input type="password" v-model="form.password"></el-input>
         </el-form-item>
       <el-form-item>
           <el-button type="primary" class="login-btn" @click="onsubmit">登录</el-button>
         </el-form-item>
       </el-form>
     </div>
</template>


<script>
  export default {
    data() {
      return {
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
    methods: {
      onsubmit() {
        // 发送axios的post请求
        var urlstr = "http://localhost:8014/users?username=" + this.form.username + "&password=" + this.form.password;
        // console.log(urlstr);
        this.$Axios.get(urlstr)
          .then(backdata => {
            // console.log(backdata);
            // console.log(backdata.status);
            // console.log(backdata.data.length);
            if (backdata.data.length!=0) {
              this.$message({
                message:"登录成功！",
                type:"success"
              });
              // console.log(backdata.data);
              // console.log(backdata.data[0].id);
              localStorage.setItem('loginuserid',backdata.data[0].userID);
              localStorage.setItem('loginusername',backdata.data[0].userName);
              // console.log(localStorage.getItem('loginuserid'));
              this.$router.push({path:'/'});
            } else{
              this.$message.error("用户名或密码错误，请重新输入！");
            }
          });
      }
    }


  }
</script>

<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-from {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }

  .login-wrap .login-from .login-btn {
    width: 100%;
  }
</style>
