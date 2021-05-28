const { data } = require('jquery');
var mysql=require('mysql');
var connection=null;
module.exports={
    wh: undefined,
    num:0,
    condition:undefined,
    openConn() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'blogs'
        });
        connection.connect();
        return connection;
    },
    endConn(conn) {
        conn.end();
    },
    where(wh) {
        this.wh = wh;
        return this;
    },
    limit(num){
        this.num = num
        return this
    },
    sequence(condition){
        this.condition = condition;
        return this;
    },
    //查询
    select(table, connection, callback) {
        if (this.wh == undefined) {
            if(this.num === 0){
                if (this.condition == undefined) {
                    var sql = "select * from " + table;
                } else {
                    var sql = "select * from " + table + " order by " + this.condition + " desc "
                }
            }else{
                if (this.condition == undefined) {
                    var sql = "select * from " + table + " limit " + this.num;
                } else {
                    var sql = "select * from " + table + " order by " + this.condition + " desc " + " limit " + this.num 
                }
            }
        } else {
            if(this.num == 0){
                if (this.condition == undefined) {
                    var sql = "select * from " + table + " where " + this.wh;
                } else {
                    var sql = "select * from " + table + " where " + this.wh + " order by " + this.condition + " desc "
                }
            }else{
                if (this.condition == undefined) {
                    var sql = "select * from " + table + " where " + this.wh + " limit " + this.num;
                } else {
                    var sql = "select * from " + table + " where " + this.wh + " order by " + this.condition + " desc " + " limit " + this.num 
                }
            }
        }
        console.log(sql);
        this.wh = undefined;
        this.num = 0
        this.condition = undefined
        connection.query(sql, function (error, datas, fields) {
            callback(datas);
        })
    },
    //删除
    delete(table, connection, callback) {
        if (this.wh != undefined) {
            var sql = "delete from " + table + " where " + this.wh;
            console.log(sql);
            connection.query(sql, function (error, datas, fields) {
                console.log(datas);
                callback(datas.affectedRows);
            });
        }
        this.wh = undefined;
    },
    //增加
    insert(table,obj,connection,callback) {
        //待插入的值
        var insert = '';
        //待插入的字段名
        var inser = '';
        for (let key in obj) {
            inser += key + ',';
        }
        for (let key in obj) {
            insert += "'" ,obj[key] + "',";
        }
        inser = inser.slice(0, inser.length - 1);
        insert = insert.slice(0, insert.length - 1);
        var sql = "insert into "+table+ " (" + inser + ") values(" + insert + ")";
        console.log(sql);
        connection.query(sql, function (error, datas, fields) {
            console.log(datas);
            callback(datas.affectedRows);
        })	
    },
    //修改
    update(table,obj,connection,callback) {
        var set = '';
        if (this.wh != undefined) {
            for (let key in obj) {
                set += key + "='" + obj[key] + "',";
            }
        }
        set = set.slice(0, set.length - 1);
        var sql = "update "+table+" set " + set + " where " + this.wh;
        console.log(sql)
        connection.query(sql, function (error, datas, fields) {
            callback(datas.changedRows);
        });
        this.wh = undefined;
    }
}