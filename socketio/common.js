/**
 * Created by Administrator on 2016/3/2.
 */
var str = {code: 0, msg: ''};
//推送给用户好友列表
exports.getFriendList = function(socket,io,username,socketOnLine){//socket对象  id用户userInfo的id
    var con = require('../db/db')();
    var friendName = [];
    for(var b in socketOnLine){
        friendName.push(b);
        console.log(friendName)
    }
    var sql = con.query('select * from userinfo where username in (?)',[friendName],function(err,rows){
        if(err){
            str.code = 5;
            str.msg = '获取用户列表失败';
            socket.emit('main',str);
            return ;
        }
        str.code = 1;
        str.msg = {};
        for(var n =0; n < rows.length;n++){
            str.msg[rows[n].username] = {};
            str.msg[rows[n].username]['id'] = rows[n].id;
            str.msg[rows[n].username]['name'] = rows[n].username;
            str.msg[rows[n].username]['moto']= rows[n].moto;
            str.msg[rows[n].username]['time'] = '25:00 PM';
        }
        io.sockets.emit('main',str);
    });
    console.log(sql.sql)
}
