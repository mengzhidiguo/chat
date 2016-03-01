/**
 * Created by 周建 on 2015/12/4.
 */
var main_socket = null;
var query = require('../db/db');


function init(io){
    console.log("socket启动");
    var num=0;
    io.on('connection', function(socket) {
        socket.on('login',function(msg){
            var str = {code:0,msg:'失败'};
            if(msg.username == '周建' && msg.password == 'zhoujian')
                str = {code:0,msg:'成功'};


            query('select * from blog_article;',function(rows){
               var author = rows[0].author, date = rows[0].time, times = rows[0].hit, title = rows[0].title;
                console.log(author+date+times+title)
                str.msg = author+date+times+title;
                socket.emit('login',str);
            })
        });

        socket.on('chat',function(msg){

            var temp = {code:0,type: msg.type, imgSrc: './image/friend_name_06.png', body: msg.body}
            socket.emit('chat',temp);
        });
        socket.on('photo', function(msg) {
        var base64Data = msg.replace(new RegExp('^data:image/jpeg;base64,'), "");

        var buffer = new Buffer(base64Data, "base64");
        //fs.open(new Date().getTime()+"1"+new Date().getMilliseconds() + ".jpeg", "ax+", function(err, fd) {
        //    if (err == null) {
        //        fs.write(fd, buffer, 0, buffer.length, function(err, written, string) {
        //        });
        //        fs.close(fd,function(){});
        //    }
        //});
            io.sockets.emit("msg",{msg:msg,id:socket.id});
    });
    });
    //io.on('connection', function(socket) {
    //    //blog主人登陆
    //    socket.on('main',function(socket){
    //       main_socket = socket;
    //    });
    //    //blog主人给指定人发送消息,msg.id为收信人的socket.id msg.msg为信息主体
    //    socket.on('main_msg',function(msg){
    //        for(a in io.sockets.sockets)
    //        {
    //            //找到要发送的那个人
    //            if(msg.id == io.sockets.sockets[a].id)
    //                io.sockets.sockets[a].emit('msg',msg.msg);
    //        }
    //    });
    //    socket.on("disconnect",function(socket){
    //       if(main_socket!=null && socket.id == main_socket.id)
    //           main_socket = null;
    //    });
    //});
}
exports.chat = init;