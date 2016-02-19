var express = require('express');
var path = require('path');
var index = require('./routes/index');
//var fs = require("fs");
require('./db/db');
//获取post数据用的中间件
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
require("./socketio/chat").chat(require('socket.io')(http));

//使用post数据中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 设置视图引擎，目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);




http.listen(require('./config.js').port,function(){
    console.log("监听开始"+3000||require('./config.js').port);
});
