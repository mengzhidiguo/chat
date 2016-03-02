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
        if (rows.length <= 0) {
            str.msg = '此用户未注册，请注册后登陆';
            socket.emit('login', str);
            return;
        }
        var author = rows[0].author, date = rows[0].time, times = rows[0].hit, title = rows[0].title;
        console.log(author + date + times + title)
        str.msg = author + date + times + title;
        socket.emit('login', str);
    });
    console.log(sql.sql);
};