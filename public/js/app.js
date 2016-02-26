require.config({
    baseUrl:'js/lib',
    paths: {
        "init": "../model/init",
        "config":'../model/config',
        'login':'../model/login',
        'menu':'../model/menu',
        'friend':'../model/friend',
        'chatlist':'../model/chatlist',
        'angularApp':'../model/angularApp',
        'iscroll':'iscroll',
        'angular':'angular.min',
        'io':'socket.io-1.2.0',
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



