/**
 * Created by Administrator on 2016/3/2.
 */
var query = require('../db/db');


module.exports = function (msg, socket,io,socketOnLine) {
    var str = {code: 1, msg: '失败'};
    if (msg.username === '' || msg.username === undefined) {
        str.msg = '请输入用户名，密码';
        socket.emit('login', str);
        return;
    }
    if(socketOnLine[msg.username] !== undefined) {
        str.msg = '该用户已经登录';
        socket.emit('login', str);
        return;
    }
    query(1,['select * from chat_user where username = ?',[msg.username]], function (rows,err) {
        if (err) {
            str.msg = '内部数据错误，内容已记录，请等待解决';
            socket.emit('login', str);
            return;
        }
        console.log("查询结果数量:"+rows.length);
        if (rows.length <= 0) {
            str.code = 2;
            str.msg = '此用户未注册，正在注册请等待';
            socket.emit('login', str);
            query(1,['insert into chat_user set  ?',{username:msg.username, password:msg.password, moto:'吃饭要吃饱'}], function ( rows,err){
                if(!err){
                    str.code = 0;
                    str.msg = '注册成功,登录中';
                    socket.emit('login', str);
                    //推送用户  登陆成功
                    str.code = 0;
                    str.msg = '登陆成功';
                    socket.emit('login', str);
                    socketOnLine[msg.username] = socket.id;
                    //推送用户 用户信息
                    str.code = 0;
                    str.msg = rows[0];
                    socket.emit('main', str);

                    // 推送给用户好友列表
                    require('./common').getFriendList(socket,io,msg.username,socketOnLine);
                }
            });
            return;
        }
        if(rows[0].username !== msg.username){
            str.msg = '用户名输入错误';
            socket.emit('login', str);
            return ;
        }
        else if(rows[0].password !== msg.password){
            str.msg = '密码输入错误';
            socket.emit('login', str);
            return ;
        }
        //推送用户  登陆成功
        str.code = 0;
        str.msg = '登陆成功';
        socket.emit('login', str);
        socketOnLine[msg.username] = socket.id;
        //推送用户 用户信息
        str.code = 0;
        str.msg = rows[0];
        socket.emit('main', str);

       // 推送给用户好友列表
       require('./common').getFriendList(socket,io,msg.username,socketOnLine);
    });
};