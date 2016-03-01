module.exports  = {
    //数据库配置
    mysql0:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        port:3306
    },
    mysql:{
        host     : 'SAE_MYSQL_HOST_M',
        user     : 'SAE_MYSQL_USER',
        password : 'SAE_MYSQL_PASS',
        database : 'app_mengzhidiguo',
        port:3307//'SAE_MYSQL_PORT'
    },
    //端口设置
    port:process.env.PORT || 5050,
    port1:3000||process.env.PORT || 5050,
};
