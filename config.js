module.exports  = {
    //数据库配置
    mysql1:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        port:3306
    },
    mysql0:{
        host     : 'SAE_MYSQL_HOST_M',
        user     : 'SAE_MYSQL_USER',
        password : 'SAE_MYSQL_PASS',
        database : 'test',
        port:SAE_MYSQL_PORT
    },
    //端口设置
    port:process.env.PORT || 5050,
    port0:3000||process.env.PORT || 5050,
};
