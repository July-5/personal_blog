<template>
    <el-container>
            <el-header>
                <el-menu default-active="/detail" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
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
        <el-main class="mainlocation">
            <div class="containerT">
                <div class="top" style="color: #00b5ad;">
                    <i class="el-icon-date"></i><span>{{articlelist.articleDate}}</span>
                    <i class="el-icon-view" style="margin-left:30px"></i><span>{{articlelist.articleView}}次数</span>
                </div>
                <hr/>
                <div class="bigimg">
                    <img src="../../static/img/test.jpg" alt="" style="width:100%; height:600px; border-radius:10px">
                </div>
                <hr/>
                <div class="content">
                    <div class="typo-h1">{{articlelist.articleTitle}}</div>
                    <div class="typo" style="text-align:left" v-highlight v-html="content"></div>
                </div>
                <hr/>
                <div class="comment">
                    <div class="top" style="margin:3px 18px;">
                        <h2>评论</h2>
                    </div>
                    <hr style="width:96%; margin:0 auto"/>
                    <div class="main" v-for="item in commentforarticle" :key="item.articleID">
                        <div class="toppart">
                            <div class="block">
                                <el-avatar :size="30" shape="square" :src="circleUrl" style="background-color:#ccc"></el-avatar>
                                <span style="margin-left:5px; font-size:18px">{{item.userNickname}}</span>
                            </div>
                            <div class="time">
                                <span style="color:#85aed4">{{item.commentDate}}</span>
                            </div>
                        </div>
                        <div class="footpart">
                            <span style="font-size:16px; margin-top:10px">{{item.commentContent}}</span>
                        </div>
                        <hr/>
                    </div>
                    <div class="sendcom">
                        <el-input placeholder="请输入内容" v-model="addcommentData.commentContent" clearable class="sendinput"></el-input>
                        <el-button class="sendbtn" @click="sendcomment">发布</el-button>
                    </div>
                </div>
            </div>
        </el-main>
        <el-footer>
            <span>Copyright ©2020-2021 G Blog By GCY</span><br>
            <span>津ICP备20393507号</span>
    </el-footer>
    </el-container>
</template>
<script>
import marked from 'marked'
import moment from 'moment'
export default {
    data(){
        return{
            search:'',
            circleUrl:'../../static/img/userp.jpg',
            input:'',
            articleid:'',
            articlelist:{},
            content:'xxx',
            editarticleData: {},
            commentforarticle:{},
            addcommentData:{
                commentContent:'',
                commentDate:'2012-12-10'
            },
            nowTime: new Date(),
            msg:'xxx',
            isL:false,
            isS:false
        }
    },
    inject: ['reload'],
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        sendcomment(){
           let token = localStorage.getItem("token");
           this.addcommentData.userID = token;
           this.addcommentData.articleID = this.articlelist.articleID;
           const moment = require('moment');
           moment.suppressDeprecationWarnings = true;
           this.addcommentData.commentDate = moment(this.nowTime).format('YYYY-MM-DD HH:mm:ss')
           if(token == null){
               alert('请用户先登录再评论文章')
               this.$router.push('/login')
           }else{
                this.$Axios({
                url: 'http://localhost:8014/commentAdd',
                method: "post",
                data: this.addcommentData
                }).then(backdata => {
                     this.reload()
                   this.$message({
                    message:"添加成功！",
                    type:"success"
                    });
                });
            }
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
    created() {
        this.articlelist = JSON.parse(this.$route.query.data);
        this.content = marked(this.articlelist.articleContent);
    },
    mounted() {
        this.editarticleData.articleTitle = this.articlelist.articleTitle;
        this.editarticleData.articleContent = this.articlelist.articleContent;
        this.editarticleData.articleDate = this.articlelist.articleDate;
        this.editarticleData.articleView = this.articlelist.articleView;

        this.$Axios({
          url:"http://localhost:8014/articleUpdatedo/?id="+this.articlelist.articleID,
          method:"post",
          data:this.editarticleData
        }).then(backdata=>{
          if (backdata.status==200) {
            console.log('articleView自增成功')
          }
        });

        this.$Axios({
          url:'http://localhost:8014/commentPage/?id='+this.articlelist.articleID,
          method:"get"
        }).then(backdata=>{
          this.commentforarticle = backdata.data;
          //this.reload()
          console.log(this.commentforarticle)
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
    min-height: 2200px;
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

  .containerT{
      width: 80%;
      min-height: 2200px;
      margin: 50px auto;
      border: 1px solid #00b5ad;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #fff;
  }

  .containerT .top{
      width: 90%;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }

  hr{
    width:100%; 
    size: 10px;
  }

  .bigimg{
      width: 90%;
      height: 600px;
      margin: 20px 10px;
  }

  .content{
      width: 90%;
      min-height: 600px;
      margin: 30px;
  }

  .comment{
      border: 1px solid #00b5ad;
      border-radius: 10px;
      width: 90%;
      margin: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }

  .comment .main{
      /* border: 1px solid #333; */
      width: 90%;
      height: 80px;
      margin: 20px 0;
  }

  .comment .main .toppart{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .comment .main .toppart .block{
      display: flex;
      justify-content: center;
      align-items: center;

  }

  .comment .main .footpart{
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }

  .comment .sendcom{
      /* border: 1px solid #333; */
      width: 80%;
      height: 60px;
      margin: 20px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
  }

  .comment .sendcom .sendinput{
      width: 70%;
  }

  .comment .sendcom .sendbtn{
      background-color: #009688;
      color: #fff;
      border-color: #009688;
      height: 40px;
  }

  .comment .sendcom .sendbtn:hover{
      background-color: #30a89c;
      color: #fff;
      border-color: #30a89c;
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