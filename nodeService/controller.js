var fs=require('fs');
var moment=require('moment');
var querystring=require('querystring');
var conn=require('./database/conns');
var url=require('url');
var formidable = require('formidable');
var cors = require('./cors')
module.exports = {
    //查询用户
    selectUser(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        cors.complete(res);
        //查询所有
        if(flag){
            //console.log('--------------------');
            conn.select('users',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson); 
            });
        //模糊查询
        }else if(urlobj.query.username !== undefined && urlobj.query.username === ''){
            var str="userName like '%"+urlobj.query.userName_like+"%'";
            console.log(str);
            conn.where(str).select('users',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
              });
        //登录验证
        }else{
            var str="userName='"+urlobj.query.username+"' and userPassword='"+urlobj.query.password+"'";
            console.log(urlobj)
            conn.where(str).select('users',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
              });
        }
        conn.endConn(connection);
    },
    //删除用户
    deleteuser(req,res){
        var urls = url.parse(req.url, true);
        var userId = urls.query.id;
        console.log(urls.query.id)
        var connection = conn.openConn();
        conn.where('userID=' + userId).delete("users", connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log('str----'+str);
                res.end(str);
        });
        conn.endConn(connection);
    },
    //增加用户
    adduser(req,res){
        var form=new formidable.IncomingForm;
        form.parse(req,function(error,fields,data) {
            var user=fields;
            console.log('+++++++++++++++++++++');
            console.log(fields);
            console.log('+++++++++++++++++++++');
            var connection=conn.openConn();
            conn.insert("users",user,connection,function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
              });
            conn.endConn(connection);
        });
    },
    //查找待修改用户
    updateuser(req,res){
        var urls=url.parse(req.url,true);
        var userId = urls.query.id;
        var connection=conn.openConn();
        conn.where('userID=' + userId).select("users", connection, function (datas) {
            var str=JSON.stringify(datas);
            console.log('str----'+str);
            res.end(str);
    });
    conn.endConn(connection);
    },
    //修改用户
    updateuserdo(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, datas) => {
            console.log(fields);
            var user = fields;
            var connection = conn.openConn();
            conn.where('userID=' + urlobj.query.id).update("users",user, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },
    //查询博客
    selectArticle(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        console.log(urlobj);
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            conn.select('articles',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }else if(urlobj.articleTitle !== 'undefined'){
            console.log('............................');
            var str="articleTitle like '%"+urlobj.query.articleTitle_like+"%'";
            console.log(str);
            conn.where(str).limit(10).select('articles',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
              });
        }
        conn.endConn(connection);
    },
    //删除博客
    deleteArticle(req,res){
        var urls = url.parse(req.url, true);
        //var userId = 2;
        var articleId = urls.query.id;
        var connection = conn.openConn();
        conn.where('articleID=' + articleId).delete("articles", connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log('str----'+str);
                res.end(str);
           
        });
        conn.endConn(connection);
    },
    //增加博客
    addArticle(req,res){
        var form=new formidable.IncomingForm;
        form.parse(req,function(error,fields,files) {
            var article=fields;
            var connection=conn.openConn();
            conn.insert("articles",article,connection,function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
              });
            conn.endConn(connection);
        });
    },
    //查找待修改博客
    updateArticle(req,res){
        var urls=url.parse(req.url,true);
        var articleId = urls.query.id;
        var connection=conn.openConn();
        conn.where('articleID=' + articleId).select("articles", connection, function (datas) {
            var str=JSON.stringify(datas);
            console.log('str----'+str);
            res.end(str);
    });
    conn.endConn(connection);
    },
    //修改博客
    updateArticledo(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, files) => {
            // console.log(fields);
            var article = fields;
            var connection = conn.openConn();
            conn.where('articleID=' + urlobj.query.id).update("articles",article, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },
    //查看评论
    selectComment(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        //console.log(urlobj);
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            conn.sequence("comments.commentID") .select('comments',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }
        conn.endConn(connection);
    },
    //删除评论
    deleteComment(req,res){
        var urls = url.parse(req.url, true);
        //var userId = 2;
        var commentId = urls.query.id;
        var connection = conn.openConn();
        conn.where('commentID=' + commentId).delete("comments", connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log('str----'+str);
                res.end(str);
            });
        conn.endConn(connection);
    },
    //增加评论
    addComment(req,res){
        var form=new formidable.IncomingForm;
        form.parse(req,function(error,fields,files) {
            var comment=fields;
            var connection=conn.openConn();
            conn.insert("comments",comment,connection,function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
              });
            conn.endConn(connection);
        });
    },
    //查找待修改评论
    updateComment(req,res){
        var urls=url.parse(req.url,true);
        var commentId = urls.query.id;
        var connection=conn.openConn();
        conn.where('commentID=' + commentId).select("comments", connection, function (datas) {
            var str=JSON.stringify(datas);
            console.log('str----'+str);
            res.end(str);
    });
    conn.endConn(connection);
    },
    //修改评论
    updateCommentdo(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, files) => {
            // console.log(fields);
            var comment = fields;
            var connection = conn.openConn();
            conn.where('commentID=' + urlobj.query.id).update("comments",comment, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },
    //回复评论
        //通过ID找到所要回复的评论
        //增加一条评论
    replyComment(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, files) => {
            // console.log(fields);
            var comment = fields;
            var connection = conn.openConn();
            conn.where('commentID=' + comment.id).insert("comments",comment, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },

    //查看分类
    selectSort(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        //console.log(urlobj);
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            conn.select('sorts',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }else{
            var str="sortName like '%"+urlobj.query.sortName_like+"%'";
            console.log(str);
            conn.where(str).select('sorts',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
              });
        }
        conn.endConn(connection);
    },
    //删除分类
    deleteSort(req,res){
        var urls = url.parse(req.url, true);
        var sortId = urls.query.id;
        var connection = conn.openConn();
        conn.where('sortID=' + sortId).delete("sorts", connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log('str----'+str);
                res.end(str);
            });
        conn.endConn(connection);
    },
    //增加分类
    addSort(req,res){
        var form=new formidable.IncomingForm;
        form.parse(req,function(error,fields,files) {
            var sort=fields;
            var connection=conn.openConn();
            conn.insert("sorts",sort,connection,function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
              });
            conn.endConn(connection);
        });
    },
    //查找待修改分类
    updateSort(req,res){
        var urls=url.parse(req.url,true);
        var sortId = urls.query.id;
        var connection=conn.openConn();
        conn.where('sortID=' + sortId).select("sorts", connection, function (datas) {
            var str=JSON.stringify(datas);
            console.log('str----'+str);
            res.end(str);
    });
    conn.endConn(connection);
    },
    //修改分类
    updateSortdo(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, files) => {
            // console.log(fields);
            var sort = fields;
            var connection = conn.openConn();
            conn.where('sortID=' + urlobj.query.id).update("sorts",sort, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },
    //查看标签
    selectLabel(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        //console.log(urlobj);
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            conn.select('labels',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }else{
            var str="labelName like '%"+urlobj.query.labelName_like+"%'";
            console.log(str);
            conn.where(str).select('labels',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
              });
        }
        conn.endConn(connection);
    },
    //删除标签
    deleteLabel(req,res){
        var urls = url.parse(req.url, true);
        //var userId = 2;
        var labelId = urls.query.id;
        var connection = conn.openConn();
        conn.where('labelID=' + labelId).delete("labels", connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log('str----'+str);
                res.end(str);
            });
        conn.endConn(connection);
    },
    //增加标签
    addLabel(req,res){
        var form=new formidable.IncomingForm;
        form.parse(req,function(error,fields,files) {
            var label=fields;
            var connection=conn.openConn();
            conn.insert("labels",label,connection,function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
              });
            conn.endConn(connection);
        });
    },
    //查找待修改分类
    updateLabel(req,res){
        var urls=url.parse(req.url,true);
        var labelId = urls.query.id;
        var connection=conn.openConn();
        conn.where('labelID=' + labelId).select("labels", connection, function (datas) {
            var str=JSON.stringify(datas);
            console.log('str----'+str);
            res.end(str);
    });
    conn.endConn(connection);
    },
    //修改标签
    updateLabeldo(req,res){
        var urlobj=url.parse(req.url,true);
        var form = new formidable.IncomingForm;
        form.parse(req, (error, fields, files) => {
            // console.log(fields);
            var label = fields;
            var connection = conn.openConn();
            conn.where('labelID=' + urlobj.query.id).update("labels",label, connection, function (datas) {
                var str=JSON.stringify(datas);
                console.log(str);
                res.end(str);
            });
            conn.endConn(connection);
        });
    },
    //首页博客模块连表查询
    homePageShow(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            var str = "sorts.sortID = articles.sortID and labels.articleID = articles.articleID"
            conn.where(str).select('articles,users,sorts,labels',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }
        conn.endConn(connection);
    },

    //博客详情页
    blogPageShow(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            var str = "users.userID = articles.userID"
            conn.where(str).select('users,articles',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }
        conn.endConn(connection);
    },

    //评论详情页
    commentPageShow(req,res){
        var urlobj=url.parse(req.url,true);
        var connection=conn.openConn();
        var flag=JSON.stringify(urlobj.query) == "{}";
        cors.complete(res);
        if(flag){
            console.log('--------------------');
            var str = "users.userID = comments.userID and comments.articleID = articles.articleID"
            conn.where(str).select('users,comments,articles',connection,function (datas) {
                var datajson=JSON.stringify(datas);
                res.end(datajson);
            });
        }
        conn.endConn(connection);
    },
    other: function (urls, res) {
        // 根据请求地址获取相应资源
        fs.readFile('.' + urls, function (err, data) {
            // 响应资源数据
            // console.log("响应资源数据");
            res.end(data);
        })
    }
}