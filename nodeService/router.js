var express=require('express');
var controller=require('./controller');
// 实例化出express 框架下的路由对象
var router=express.Router();

router
//用户操作
.get('/users',function (req,res) {
  controller.selectUser(req,res);
})
.get('/userDele',controller.deleteuser)
.post('/userAdd',controller.adduser)
.get('/userUpdate',controller.updateuser)
.post('/userUpdatedo',controller.updateuserdo)

//blog操作
.get('/article',controller.selectArticle)
.get('/articleDele',controller.deleteArticle)
.post('/articleAdd',controller.addArticle)
.get('/articleUpdate',controller.updateArticle)
.post('/articleUpdatedo',controller.updateArticledo)

//评论操作
.get('/comment',controller.selectComment)
.get('/commentDele',controller.deleteComment)
.post('/commentAdd',controller.addComment)
.get('/commentUpdate',controller.updateComment)
.post('/commentUpdatedo',controller.updateCommentdo)

//分类操作
.get('/sort',controller.selectSort)
.get('/sortDele',controller.deleteSort)
.post('/sortAdd',controller.addSort)
.get('/sortUpdate',controller.updateSort)
.post('/sortUpdatedo',controller.updateSortdo)

//标签操作
.get('/label',controller.selectLabel)
.get('/labelDele',controller.deleteLabel)
.post('/labelAdd',controller.addLabel)
.get('/labelUpdate',controller.updateLabel)
.post('/labelUpdatedo',controller.updateLabeldo)

//连表查询
//1.首页模块
.get('/homePage',controller.homePageShow)
//博客展示页模块
.get('/blogPage',controller.blogPageShow)
//评论详情页
.get('/commentPage',controller.commentPageShow)
//页面导出
  module.exports=router;