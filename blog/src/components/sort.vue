<template>
    <el-container>
            <el-header>
                <el-menu default-active="sort" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
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
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-header>
        <div class="mainlocation">
            <div class="container">
                <div class="row">
                    <div class="col-4" v-for="item in sortlist" :key="item.sortID">
                        <div class="selfbox animate__animated animate__fadeInDownBig" @click="delink(item.sortID)">
                            <img src="../../static/img/te.jpg" class="imgsize">
                            <div class="maincontent">
                                <el-button type="success" size="mini" round style="background-color:#2ec4b6; border-color:#2ec4b6">{{item.sortName}}</el-button><br/>
                                <span style="font-size:16px">{{item.sortDescription}}</span><br/>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
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
            sortlist:[],
            articleData:[],
            msg:'xxx',
            isL:false,
            isS:false
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        delink(k){
            this.$Axios.get('http://localhost:8014/sortDetail/?id='+k)
            .then(backdata => {
                this.articleData = backdata.data;
                this.$router.push({path:'/sortdetail',query:{data:JSON.stringify(this.articleData)}})
                console.log("=========="+this.articleData+"=========")
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
    mounted() {
        this.$Axios({
          url:'http://localhost:8014/sort',
          method:"get"
        }).then(backdata=>{
          this.sortlist = backdata.data;
        });

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
    min-height: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .imgsize{
      width:100%;
      height:250px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
  }

  .selfbox{
      padding: 0;
      width:320px; 
      height:400px;
      margin: 30px 10px;
      border-radius:10px;
      background-color: #fff;
      box-shadow:0px 5px 5px 3px #ccc;
   }

  .selfbox:hover{
      box-shadow:18px 36px 5px 3px#e4e4e4;
      transition: all .25s cubic-bezier(.02,.01,.47,1);
  }

  .maincontent{
        display: flex;
        height: 150px;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        padding: 30px;
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