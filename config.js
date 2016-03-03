module.exports  = {
    //数据库配置
    mysql1:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        port:3306,
        debug: ['ComQueryPacket', 'RowDataPacket']
    },
    mysql:{
        host     : process.env.MYSQL_HOST,
        port     : process.env.MYSQL_PORT,
        user     : process.env.ACCESSKEY,
        password : process.env.SECRETKEY,
        database : 'app_' + process.env.APPNAME,
        debug: ['ComQueryPacket', 'RowDataPacket']
    },
    //express监听端口设置
    port:process.env.PORT || 5050,
    port1:3000||process.env.PORT || 5050,
};
