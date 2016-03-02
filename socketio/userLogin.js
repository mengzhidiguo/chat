/**
 * Created by Administrator on 2016/3/2.
 */
var con = require('../db/db');

module.exports = function (msg, socket) {
    var str = {code: 1, msg: '失败'};
    if (msg.username === '' || msg.username === undefined) {
        str.msg = '请输入用户名，密码';
        socket.emit('login', str);
        return;
    }
    var sql = con.query('select id,password from userinfo where username = ?',[msg.username], function (err, rows) {
        if (err) {
            str.msg = '内部数据错误，内容已记录，请等待解决';
            socket.emit('login', str);
            return;
        }
        console.log(rows.length);
        if (rows.length <= 0) {
            str.code = 2;
            str.msg = '此用户未注册，正在注册请等待';
            socket.emit('login', str);
            con.query('insert into userinfo set  ?',{
                username:msg.username,
                password:msg.password,
                moto:'吃饭要吃饱',
            }, function (err, rows){
                if(!err){
                    str.code = 0;
                    str.msg = '注册成功,登录中';
                    socket.emit('login', str);
                }
            })
            return;
        }
        str.code = 0;
        str.msg = '登陆成功';
        socket.emit('login', str);
    });
    console.log(sql.sql);
};