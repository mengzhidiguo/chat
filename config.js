module.exports  = {
    //数据库配置
    mysql1:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        port:3306
    },
    mysql:{
        host     : process.env.MYSQL_HOST,
        port     : process.env.MYSQL_PORT,
        user     : process.env.ACCESSKEY||'4ox3j0kyjw',
        password : process.env.SECRETKEY||'mzz2xx3h155kjhkwzl114wjwhx1l0ljizw0xh1lj',
        database : 'app_' + process.env.APPNAME
    },
    //端口设置
    port:process.env.PORT || 5050,
    port1:3000||process.env.PORT || 5050,
};
