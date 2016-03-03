module.exports  = {
    //数据库配置
    mysql:{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test',
        port:3306,
        connectionLimit:10,
    },
    mysql1:{
        host     : process.env.MYSQL_HOST,
        port     : process.env.MYSQL_PORT,
        user     : process.env.ACCESSKEY,
        password : process.env.SECRETKEY,
        database : 'app_' + process.env.APPNAME,
        connectionLimit:10,
    },
    //express监听端口设置
    port1:process.env.PORT || 5050,
    port:3000||process.env.PORT || 5050,
};
