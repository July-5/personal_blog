<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-show="showBread">{{$route.meta.title}}</el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 搜索框 -->
    <div class="searchbar">
      <el-input placeholder="请输入内容" v-model="usersearch" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
      </el-input>
      <el-button class="addbtn" type="success" @click="showUserDialog" plain>添加用户</el-button>
    </div>
    <!-- 用户列表 -->
    <el-table :data="userlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" class="tabusers">
      <el-table-column fixed prop="userID" label="编号" width="100">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="170">
      </el-table-column>
      <!-- <el-table-column prop="userPassword" label="密码" width="">
      </el-table-column> -->
      <el-table-column prop="userEmail" label="邮箱" width="">
      </el-table-column>
      <el-table-column prop="userPhoto" label="头像" width="">
      </el-table-column>
      <el-table-column prop="userTel" label="电话" width="">
      </el-table-column>
      <el-table-column prop="userNickname" label="昵称" width="">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">

        <template slot-scope="scope">
          <!-- 删除用户信息 -->
          <el-button type="danger" size="mini" @click="deleteuser(scope.row)" icon="el-icon-delete" circle></el-button>
          <!--修改用户信息  -->
          <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
          background layout="prev, pager, next"
          :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          :pager-count="5"  
          :total="userlist.length"
        >
        </el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="isShowAddUser" class="dialogStyle">
      <el-form :model="addUserData">
        <el-form-item label="用户名">
          <el-input v-model="addUserData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserData.userPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addUserData.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="addUserData.userPhoto" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addUserData.userTel" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="昵称">
          <el-input v-model="addUserData.userNickname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddUser=false">取 消</el-button>
        <el-button type="primary" @click="addUserPost">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="编辑用户" :visible.sync="isShoweditUser">
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
        <el-form-item label="头像">
          <el-input v-model="editUserData.userPhoto" autocomplete="off"></el-input>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '用户列表',
        userlist: [],
         pagesize:7,//每页多少数据
         currentPage:1, //默认当前页为第一页
         showBread:false,
        usersearch: '',
        // 添加用户需要的参数
        isShowAddUser: false,
        addUserData: {
          userName: "",
          userPassword: "",
          userEmail: "",
          userPhoto:"",
          userTel:"",
          userNickname:""
        },
        // 编辑用户
        isShoweditUser: false,
        editUserData: {},
      }
    },
    methods: {
      // 展示添加用户的弹出窗口
      current_change(currentPage){  //改变当前页
             this.currentPage = currentPage
      },

      getusers(search = '') {
        //alert("search="+search);
        var url = '';
        if (search != '') {
          url = 'http://localhost:8014/usersearch?userName_like='+ search;
        } else {
          url = 'http://localhost:8014/users';
        }
        // alert("url="+url);
        this.$Axios.get(url)
          .then(backdata => {
            console.log(backdata.data);
            this.userlist = backdata.data;
            console.log("............");
          });
      },
      searchuser() {
         //alert(this.usersearch);
        this.getusers(this.usersearch);
      },
      deleteuser(row) {
        alert(row.userID)
       this.$Axios({
         url:'http://localhost:8014/userDele?id='+row.userID,
         method:"get"
       }).then(backdata=>{  
        console.log(backdata);
        if (backdata.status==200) {
          this.$message({message:backdata.statusText,type:"success"});
          this.getusers();
        } else{
          this.$message.error("删除失败！");
        }
       });
      },
      // 添加用户需要的方法
      showUserDialog() {
        this.isShowAddUser = true;
      },
      // 添加用户发送post请求
      addUserPost() {
      // alert(this.addUserData)

        this.$Axios({
          url: 'http://localhost:8014/userAdd',
          method: "post",
          data: this.addUserData
        }).then(backdata => {
            alert('dfjjfbd')
            this.isShowAddUser = false;
            alert('进来了')
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getusers("");
        });
      },
      // 编辑用户信息
      editUser(row){
        this.isShoweditUser=true;
        alert(row.userID)
        this.$Axios.get('http://localhost:8014/userUpdate/?id='+row.userID)
          .then(backdata => {
            console.log(backdata.data);
            this.editUserData = backdata.data[0];
            console.log("............");
          });
      },
      editUserPut(){
        var userid=this.editUserData.userID;
        var urls="http://localhost:8014/userUpdatedo/?id="+userid;
        this.$Axios({
          url:urls,
          method:"post",
          data:this.editUserData
        }).then(backdata=>{
          if (backdata.status==200) {
            this.$message({
              message:"修改成功",
              type:"success"
            });
            this.isShoweditUser=false;
            this.getusers("");
          } else{
          }
        });
      }
    },
    mounted() {
      this.getusers(this.usersearch);
    },
    watch: {
    '$route' (to, from) {
      
      if (to.path !== '/' && to.path !== '/page1') {
        this.showBread = true
        console.log(this.showseparator)
      } else {
        this.showBread = false
        this.showseparator = 'HEY'
        console.log(this.showseparator)
      }
    }
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

  .tabusers {
    width: 100%;
    line-height: 100px;
  }

  .addbtn {
    float: left;
    margin: 10px;
  }
</style>
