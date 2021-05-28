<template>
    <el-container>
            <el-header>
                <el-menu default-active="/sortdetail" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
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
        <el-container class="mainlocations">
            <div class="maincontainers">
                <div class="contentcards animate__animated animate__fadeInLeft" v-for="item in articlelist" :key="item.articleID" @click="detaillink(item.articleID)">
                    <div class="left">
                    <div class="lefttop">
                        <span style="font-size:24px" class="titlelink">{{item.articleTitle}}</span>
                    </div>
                    <div class="leftmian" style="color: #00b5ad;">
                        <i class="el-icon-date"></i><span>{{item.articleDate}}</span>
                        <i class="el-icon-view"></i><span>{{item.articleView}}</span>
                    </div>
                    <div class="leftfoot" style="color: #00b5ad;" >
                        <i class="el-icon-price-tag"></i><span>标签</span>
                        <!-- <span v-for="(v,k) in labelforarticle" :key="k">{{item.labelName}}</span> -->
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
            value:'',
            articleData:{}
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
    },
    created() {
        this.articlelist = JSON.parse(this.$route.query.data)
        console.log(this.articlelist)
    },
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

.el-main {
    color: #333;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

.el-menu-demo{
    margin-top: 2px;
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .imgSnow{
    width: 250px;
    height: 150px;
    justify-content: flex-start;
    border-radius: 5px;
  }

  .input-with-select{
    background-color: #fff;
    width: 60%;
    margin-right: 80px;
    float: left;
    border-radius: 5px;
  }

  .mainlocations{
    background-image: url('../../static/img/bg.jpg');
    width: 100%;
    min-height: 600px;
  }

  .mainlocations .maincontainers{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .contentcards{
    width: 820px;
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

  .contentcards:hover{
    box-shadow:0px 12px 5px 3px #ccc;
    transition: all .25s cubic-bezier(.02,.01,.47,1);
  }

  .contentcards .left{
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .contentcards .left .lefttop .titlelink:hover{
      cursor: pointer;
      color: #1dc884;
  }

  .contentcards .right{
    width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
</style>