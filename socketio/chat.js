/**
 * Created by 周建 on 2015/12/4.
 */
//io.sockets.sockets当前所有的socket连接  通过id标识
var socketOnLine = {};
function init(io) {
    console.log("socket启动");
    var num = 0;
    io.on('connection', function (socket) {
        socket.on('login', function (msg) {
            require('./userLogin')(msg,socket,io,socketOnLine);
        });

        //code :1 出错  code :0 正常   type :1 文本消息   type:2 语音消息
        //文本消息
        socket.on('chat', function (msg) {
            console.log(msg);
            var temp = {code: 0,from:msg.from,type: msg.type, imgSrc: './image/friend_name_06.png', stream: msg.body};
            if(socketOnLine[msg.to] !== undefined){
                console.log(socketOnLine[msg.to]);
                if(io.sockets.sockets[socketOnLine[msg.to]] !== undefined){
                    io.sockets.sockets[socketOnLine[msg.to]].emit('chat',temp);
                }
            }
            else{
                temp.body = '000出现错误了';
                socket.emit('chat', temp);
                require('./common').getFriendList(socket,io,msg.from,socketOnLine);
            }
        });



        //语音消息  测试
        socket.on('voice',function(msg){
            console.log(msg);
            var temp = {code: 0,from:msg.from,type: msg.type, imgSrc: './image/friend_name_06.png', body: msg.body};
            if(socketOnLine[msg.to] !== undefined){
                console.log(socketOnLine[msg.to]);
                if(io.sockets.sockets[socketOnLine[msg.to]] !== undefined){
                    io.sockets.sockets[socketOnLine[msg.to]].emit('chat',temp);
                }
            }
            else{
                temp.body = '000出现错误了';
                socket.emit('chat', temp);
                require('./common').getFriendList(socket,io,msg.from,socketOnLine);
            }
        });




        socket.on('photo', function (msg) {
            var base64Data = msg.replace(new RegExp('^data:image/jpeg;base64,'), "");

            var buffer = new Buffer(base64Data, "base64");
            //fs.open(new Date().getTime()+"1"+new Date().getMilliseconds() + ".jpeg", "ax+", function(err, fd) {
            //    if (err == null) {
            //        fs.write(fd, buffer, 0, buffer.length, function(err, written, string) {
            //        });
            //        fs.close(fd,function(){});
            //    }
            //});
            io.sockets.emit("msg", {msg: msg, id: socket.id});
        });

        socket.on("disconnect",function(msg){
            for(var a in socketOnLine){
                if(socketOnLine[a].id === msg.id){
                    delete socketOnLine[a];
                    require('./common').getFriendList(socket,io,a,socketOnLine);
                    return ;
                }
            }
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