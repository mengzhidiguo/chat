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
        host     : process.env.SAE_MYSQL_HOST_M,
        port     : process.env.SAE_MYSQL_PORT,
        user     : process.env.SAE_MYSQL_USER||'4ox3j0kyjw',
        password : process.env.SAE_MYSQL_PASS||'mzz2xx3h155kjhkwzl114wjwhx1l0ljizw0xh1lj',
        database : 'app_zhouapp'
    },
    //端口设置
    port:process.env.PORT || 5050,
    port1:3000||process.env.PORT || 5050,
};
