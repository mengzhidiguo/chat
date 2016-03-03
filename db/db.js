
var mysql      = require('mysql');



//module.exports = connection.query;

module.exports = function(type,sql,callback){
    if(!mysql){
        mysql      = require('mysql');
    }
    var sqlText = '';

    var con = mysql.createConnection(require('../config.js').mysql);
    //连接不存在
    if(!con){
        console.error('数据库连接错误'+con);
        return ;
    }

    //sql方式
    if(type === 0){
        sqlText = con.query(sql[0],function(err,results){
            if(err){
                console.log('数据库查询出错');
                console.error(err);
                return ;
            }
            callback(results);
        });
    }else if(type === 1){//sql+?方式
        if(sql[1] === undefined) {
            console.log('查询参数输入错误');
            return ;
        }
        sqlText = con.query(sql[0],sql[1],function(err,results){
            if(err){
                console.log('数据库查询出错');
                console.error(err);
                return ;
            }
            callback(results);
        });
    }

    console.info(sqlText.sql);

};
