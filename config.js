module.exports  = {
    //数据库配置
    mysql:{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        port:3306
    },
    //端口设置
    port:process.env.PORT || 5050,
};
