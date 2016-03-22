require.config({
    baseUrl:'js/lib',
    paths: {
        //插件
        'iscroll':'iscroll',
        'angular':'angular.min',
        'io':'socket.io-1.2.0',


        //自定义模块
        "init": "../model/init",                //初始化
        "config":'../model/config',             //配置文件
        'login':'../model/login',               //登录控制器
        'menu':'../model/menu',                 //菜单控制器
        'friend':'../model/friend',             //好友控制器
        'chatlist':'../model/chatlist',         //聊天界面控制器
        'angularApp':'../model/angularApp',     //angularJs指令，服务，rootscope
        'getAudioMedia':'../model/getAudioMedia',//获取音频数据

    },
    shim: {
        'iscroll':{
            deps:[],
            exports: 'IScroll'
        },
        'angular':{
            deps:[],
            exports: 'angular'
        },
        'io':{
            deps:[],
            exports: 'Socket'
        },

    },
});

window.zhKeep = {
    chatScroll:null, //对话框滚动
};


//初始化根节点font-size
require(['init'], function () {
});



