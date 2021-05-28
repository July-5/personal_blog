<template>
    <el-container>
            <el-header>
                <el-menu default-active="self" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#5fb878" router>
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
                 <div class="exitslocation" v-show="isS">
                    <div style="width:200px; height:78px;line-height:78px; margin:0 auto">
                    <span>{{msg}}</span>
                    </div>
                    <el-button circle class="exitsbtn"  @click="exits()">
                    <i class="el-icon-close" ></i>
                    </el-button>
                </div>
                <div class="searchbar">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-header>
        <div class="mainlocationssxx">
            <div class="footpart">
                <div class="content"><canvas class="snow" id="snow"></canvas>
                    <div class="main-text"><a class="home-link" href="#"></a></div>
                    <div class="ground">
                        <div class="mound">
                            <div class="mound_text">Blog</div>
                            <div class="mound_spade"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toppart">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="关于本站" name="first">
                    <h3>简述</h3>
                    <hr/>
                    <p>XXX Blog是一个由个人开发的博客网站，后端使用MySQL+Node.js，前端框架使用Vue+ElementUI。</p>
                    <h5 style="text-align:left;" class="animate__animated animate__fadeInRight">功能概述</h5><br/>
                    <p style="text-align:left;" class="animate__animated animate__fadeInRight">
                      1.用户浏览博客<br/>
                      2.用户登录注册发表评论<br/>
                      3.管理员进行博客的CRUD<br/>
                      4.目前大体的功能已经完成，后续有机会将继续优化功能及界面！
                    </p>
                    <h6 style="margin-top:100px">The End</h6>
                </el-tab-pane>
                <el-tab-pane label="关于作者" name="second">
                    <h3>简述</h3>
                    <hr/>
                    <p>一个初入前端的菜鸟</p>
                    <h5 style="text-align:left;" class="animate__animated animate__fadeInRight">个人介绍</h5><br/>
                    <p style="text-align:left;" class="animate__animated animate__fadeInRight">
                      xxxxxxx<br/>
                      xxxxx<br/>
                      xxxxxxxx<br/>
                      希望自己能成为一个优秀的程序员
                    </p>
                    <h6 style="margin-top:100px">The End</h6>
                </el-tab-pane>
                <el-tab-pane label="个人中心" name="third">
                  <div v-show="isShowD" style="margin-top:100px">
                    <h4><span>当前未登录</span></h4>
                  </div>
                  <div class="imglocation" v-show="isShow">
                    <img src="../../static/img/bgs.jpg" style="width:90px;height:90px; margin:4px; border-radius:5px" alt="">
                  </div>
                  <div class="info" v-show="isShow">
                      <div class="selfinfo">
                          <div class="infomation">
                              <div class="leftinfo">
                                  <div style="margin-left:-225px">
                                    <span style="font-size:26px;"><strong>{{userlist.userNickname}}</strong></span><br/>
                                    <i class="el-icon-user"></i><span style="margin-left:10px">{{userlist.userName}}</span>
                                    <i class="el-icon-phone-outline" style="margin-left:10px"></i><span>{{userlist.userTel}}</span>
                                    <i class="el-icon-paperclip"></i><span>{{userlist.userEmail}}</span>
                                  </div>
                              </div>
                              <div class="rightinfo">
                                  <el-button @click="editUser">编辑个人信息</el-button>
                              </div>
                          </div>
                      </div>
                      <span style="font-size:18px;">已评论</span>
                      <div class="commentinfo">
                          <div class="infocard" v-for="(item, index) in commentforself.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">
                            <div class="infocardtop">
                              <p style="text-align:left">{{item.commentContent}}</p>
                            </div>
                            <hr style="width:90%;margin:-8px auto 5px"/>
                            <div class="infocardfoot">
                                <div class="icfb">
                                  <i class="el-icon-reading"></i><span>{{item.articleTitle}}</span>
                                </div>
                                <div class="icft">
                                  <i class="el-icon-date"></i><span>{{item.commentDate}}</span>
                                </div>
                            </div>
                          </div>
                           <el-pagination style="margin-top:0" background layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" :current-page.sync="currentPage" :pager-count="5" :total="commentforself.length"></el-pagination>
                      </div>
                  </div>
                  <!-- 修改用户 -->
    <el-dialog title="编辑用户" :visible.sync="isShoweditUser" class="editD">
      <el-form :model="editUserData">
        <el-form-item label="用户名">
          <el-input v-model="editUserData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editUserData.userPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUserData.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editUserData.userTel" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="昵称">
          <el-input v-model="editUserData.userNickname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShoweditUser=false">取 消</el-button>
        <el-button type="primary" @click="editUserPut">确 定</el-button>
      </div>
    </el-dialog>
                </el-tab-pane>
              </el-tabs>
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
            activeName: 'first',
            isShow:false,
            isShowD:false,
            userlist:[],
            isShoweditUser: false,
            editUserData: {},
            msg:'xxx',
            isL:false,
            isS:false,
            commentforself:[],
            pagesize:1,//每页多少数据
            currentPage:1, //默认当前页为第一页
        }
    },
    inject: ['reload'],
    methods:{
       // 展示添加用户的弹出窗口
        current_change(currentPage){  //改变当前页
              this.currentPage = currentPage
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick(tab, event) {
        console.log(tab, event);
        },
        exits(){
          this.isShowD = true;
       // 1.删除localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('loginusername');
                // 2.消息提示框
          this.$message({type:"success",message:"退出系统"});
                // 3.页面跳转
          this.$router.push("/self");
              //刷新页面
              this.reload();
        },
        editUser(){
          let token = localStorage.getItem("token");
          console.log(token)
          this.isShoweditUser = true;
          this.$Axios.get('http://localhost:8014/userUpdate/?id='+token)
          .then(backdata => {
            console.log(backdata.data);
            this.editUserData = backdata.data[0];
            console.log("............");
          });
        },
        editUserPut(){
          let token = localStorage.getItem("token");
          token=this.editUserData.userID;
          var urls="http://localhost:8014/userUpdatedo/?id="+token;
          this.$Axios({
            url:urls,
            method:"post",
            data:this.editUserData
          }).then(backdata=>{
            if (backdata.status==200) {
              this.reload()
              this.$message({
                message:"修改成功",
                type:"success"
              });
              this.isShoweditUser=false;
            } else{
            }
          });
        }
    },
    created(){
      let token = localStorage.getItem("loginusername");
      if(token == null){
        this.isShowD = true;
        this.isL = true;
      }else{
        this.isShow = true;
        this.isS = true;
        this.msg = token;
        this.$Axios({
          url:'http://localhost:8014/usersearch?userName_like=' + token,
          methods:"get"
        }).then((backdata=>{
          this.userlist = backdata.data[0];
          // console.log(this.userlist)
        }))
      };
      let tokens = localStorage.getItem("token");
      this.$Axios({
          url:'http://localhost:8014/selfcommentinfo/?id='+tokens,
          method:"get"
        }).then(backdata=>{
          this.commentforself = backdata.data;
          console.log(this.commentforself)
        });


    },
    mounted() {
      (function() {
	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}
	
	function makeSnow(el) {
		var ctx = el.getContext('2d');
		var width = 0;
		var height = 0;
		var particles = [];
		
		var Particle = function() {
			this.x = this.y = this.dx = this.dy = 0;
			this.reset();
		}
		
		Particle.prototype.reset = function() {
			this.y = Math.random() * height;
			this.x = Math.random() * width;
			this.dx = (Math.random() * 1) - 0.5;
			this.dy = (Math.random() * 0.5) + 0.5;
		}
		
		function createParticles(count) {
			if (count != particles.length) {
				particles = [];
				for (var i = 0; i < count; i++) {
					particles.push(new Particle());
				}
			}
		}
				
		function onResize() {
			width = window.innerWidth;
			height = window.innerHeight;
			el.width = width;
			el.height = height;
			
			createParticles((width * height) / 10000);
		}
		
		function updateParticles() {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = '#f6f9fa';
			
			particles.forEach(function(particle) {
				particle.y += particle.dy;
				particle.x += particle.dx;
				
				if (particle.y > height) {
					particle.y = 0;
				}
				
				if (particle.x > width) {
					particle.reset();
					particle.y = 0;
				}
				
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
				ctx.fill();
			});
			
			window.requestAnimationFrame(updateParticles);
		}
		
		onResize();
		updateParticles();
		
		window.addEventListener('resize', onResize);
	}
	
	ready(function() {
		var canvas = document.getElementById('snow');
		makeSnow(canvas);
	});
})();
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

  .mainlocationssxx{
    background-image: url('../../static/img/bg.jpg');
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .toppart{
      margin:30px auto;
      width: 90%;
      height: 450px;
      border: 1px solid #fff;
      border-radius: 5px;
      background-color: #f6f6f6;
      padding: 10px 30px;
  }

  .mainlocationssxx .footpart{
      width: 90%;
      min-height: 500px;
      /* border: 1px solid #333; */
      margin: 50px auto;
      display: flex;
      justify-content: space-between;
      align-self: start;
  }

.footpart .content {
  width: 100%;
  height: 500px;
  position: relative;
  z-index: 1;
  background-color: #d2e1ec;
  background-image: linear-gradient(to bottom, #bbcfe1 0%, #e8f2f6 80%);
  overflow: hidden;
}

#snow {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 20;
}

.footpart .content .main-text {
  padding: 20vh 20px 0 20px;
  text-align: center;
  line-height: 2em;
  font-size: 5vh;
}

.home-link {
  font-size: 0.6em;
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  border-bottom: 1px dashed rgba(93, 115, 153, 0.5);
}
.home-link:hover {
  opacity: 1;
}

.ground {
  height: 120px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #f6f9fa;
  box-shadow: 0 0 10px 10px #f6f9fa;
}
.ground:before, .ground:after {
  content: "";
  display: block;
  width: 250px;
  height: 250px;
  position: absolute;
  top: -62.5px;
  z-index: -1;
  background: transparent;
  transform: scaleX(0.2) rotate(45deg);
}
.ground:after {
  left: 50%;
  margin-left: -166.6666666667px;
  box-shadow: -295px 305px 15px #a1aec6, -605px 595px 15px #aab6cb, -945px 855px 15px #a7b4c9, -1195px 1205px 15px #9dabc4, -1495px 1505px 15px #9dabc4, -1820px 1780px 15px #b7c1d3, -2135px 2065px 15px #8798b6, -2395px 2405px 15px #8496b4, -2690px 2710px 15px #7e90b0, -3000px 3000px 15px #8496b4, -3330px 3270px 15px #8193b2, -3580px 3620px 15px #8193b2, -3940px 3860px 15px #9dabc4, -4210px 4190px 15px #b4bed1, -4500px 4500px 15px #b4bed1, -4800px 4800px 15px #b7c1d3;
}
.ground:before {
  right: 50%;
  margin-right: -166.6666666667px;
  box-shadow: 280px -320px 15px #9aa9c2, 600px -600px 15px #b0bccf, 905px -895px 15px #a1aec6, 1245px -1155px 15px #8496b4, 1515px -1485px 15px #b0bccf, 1780px -1820px 15px #8193b2, 2075px -2125px 15px #a7b4c9, 2395px -2405px 15px #97a6c0, 2715px -2685px 15px #a7b4c9, 3005px -2995px 15px #aab6cb, 3315px -3285px 15px #7e90b0, 3570px -3630px 15px #8496b4, 3860px -3940px 15px #b0bccf, 4235px -4165px 15px #9dabc4, 4505px -4495px 15px #7e90b0, 4845px -4755px 15px #91a1bc;
}

.mound {
  margin-top: -166px;
  font-weight: 800;
  font-size: 180px;
  text-align: center;
  color: #dd4040;
  pointer-events: none;
}
.mound:before {
  content: "";
  display: block;
  width: 600px;
  height: 200px;
  position: absolute;
  left: 50%;
  margin-left: -300px;
  top: 50px;
  z-index: 1;
  border-radius: 100%;
  background-color: #e8f2f6;
  background-image: linear-gradient(to bottom, #dee8f1, #f6f9fa 60px);
}
.mound:after {
  content: "";
  display: block;
  width: 28px;
  height: 6px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 68px;
  z-index: 2;
  background: #dd4040;
  border-radius: 100%;
  transform: rotate(-15deg);
  box-shadow: -56px 12px 0 1px #dd4040, -126px 6px 0 2px #dd4040, -196px 24px 0 3px #dd4040;
}

.mound_text {
  transform: rotate(6deg);
}

.mound_spade {
  display: block;
  width: 35px;
  height: 30px;
  position: absolute;
  right: 50%;
  top: 42%;
  margin-right: -250px;
  z-index: 0;
  transform: rotate(35deg);
  background: #dd4040;
}
.mound_spade:before, .mound_spade:after {
  content: "";
  display: block;
  position: absolute;
}
.mound_spade:before {
  width: 40%;
  height: 30px;
  bottom: 98%;
  left: 50%;
  margin-left: -20%;
  background: #dd4040;
}
.mound_spade:after {
  width: 100%;
  height: 30px;
  top: -55px;
  left: 0%;
  box-sizing: border-box;
  border: 10px solid #dd4040;
  border-radius: 4px 4px 20px 20px;
}

.info{
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px auto;
  width: 80%;
  height: 350px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.info .selfinfo{
  /* border: 1px solid #333; */
  width: 90%;
  height: 120px;
}

.info .selfinfo .infomation{
  /* border: 1px solid #000; */
  width: 66%;
  height: 100px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info .selfinfo .infomation .leftinfo{
  border: 1px solid #fff;
  width: 300px;
  height: 100px;
}

.info .commentinfo{
  /* border: 1px solid #333; */
  width: 96%;
  height: 180px;
}

.info .commentinfo .infocard{
  width: 80%;
  height: 120px;
  border: 1px solid #333;
  border-radius: 5px;
  margin: 12px auto;
}

.info .commentinfo .infocard .infocardtop{
  width: 98%;
  height: 62px;
  /* background-color: #f8f8f8; */
  margin: 0 auto;
}

.info .commentinfo .infocard .infocardfoot{
   width: 98%;
  height: 24px;
  /* background-color: #f5f5f5; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8c9eff;
}


.editD{
  margin-top: -110px;
}

  .exitslocation{
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

  .imglocation{
    width: 100px;
    height: 100px;
    border: 1px solid #fff;
    border-radius: 5px;
    position: absolute;
    top: -2px;
    left: 230px;
    background-color: #fff;
  }
</style>