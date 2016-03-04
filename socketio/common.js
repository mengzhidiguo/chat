/**
 * Created by Administrator on 2016/3/2.
 */

var query = require('../db/db');
var str = {code: 0, msg: ''};
//推送给用户好友列表
exports.getFriendList = function(socket,io,username,socketOnLine){//socket对象  id用户userInfo的id
    var friendName = [];
    for(var b in socketOnLine){
        //if(b === username)
        //    continue;
        friendName.push(b);
        console.log(friendName)
    }
    str.code = 1;
    str.msg = {};
    if(friendName.length <= 0)
    {
        io.sockets.emit('main',str);
        return ;
    }
    query(1,['select * from userinfo where username in (?)',[friendName]],function(rows,err){
        if(err){
            str.code = 5;
            str.msg = '获取用户列表失败';
            socket.emit('main',str);
            return ;
        }
        for(var n =0; n < rows.length;n++){
            str.msg[rows[n].username] = {};
            str.msg[rows[n].username]['id'] = rows[n].id;
            str.msg[rows[n].username]['name'] = rows[n].username;
            str.msg[rows[n].username]['moto']= rows[n].moto;
            str.msg[rows[n].username]['time'] = '25:00 PM';
        }
        io.sockets.emit('main',str);
    });
}
