var mysql      = require('mysql');
var con;
function handleDisconnect() {
    con = mysql.createConnection(require('../config.js').mysql); // Recreate the connection, since
                                                  // the old one cannot be reused.
    con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a whilesometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting toreconnect,
    }                                     // to avoid a hot loop, and to allow our nodescript to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503error.
    con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server isusually
      handleDisconnect();                         // lost due to either server restart, ora
    } else {                                      // connnection idle timeout (thewait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}
//
//handleDisconnect();

module.exports = function(type,sql,callback){
    con = mysql.createConnection(require('../config.js').mysql);
    con.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a whilesometimes).
            console.log('error when connecting to db:', err);
            return ;
        }                                     // to avoid a hot loop, and to allow our nodescript to
    });
    var sqlText = '';
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
    con.end();

};
