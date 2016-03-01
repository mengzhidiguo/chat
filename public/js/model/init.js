define(function () {
    //为String对象原型添加函数strSlice,分割'16px',返回'16'
    String.prototype.strSlice = function () {
        var str = '';
        for (var n = 0; n < this.length; n++) {
            str += this[n];
        }
        return Number(str.slice(0, str.length - 2));
    }


    //根据配置项动态更改根节点font-size大小
    var html = document.querySelector('html');
    var w = html.getBoundingClientRect().width;
    var h = html.getBoundingClientRect().height;
    var fontSize = window.getComputedStyle(html, '').fontSize.strSlice();
    if (h < w)
        w = h;
    require(['config'], function (config) {
        html.style.fontSize = w / config.baseWidth * fontSize + 'px';
    })
    //初始化滚动动作
    require(['iscroll'], function (iscroll) {
        //菜单栏滚动
        new iscroll(document.querySelector('.menu_main_menu'), {mouseWheel: true});

        //对话框滚动
        zhKeep.chatScroll = new iscroll(document.querySelector('.chat_contain'), {mouseWheel: true});
    })


    ////初始化angular
    //require(['angularApp'], function (angularApp) {
    //
    //})

    require(['login'],function(){
    });
    require(['menu'],function(){
    });
    require(['friend'],function(){
    });
    require(['chatlist'],function(){
    });
    require(['angularApp'],function(app){
        app.controller('loaddingController', ['$rootScope', '$scope', '$timeout','$switchView', function ($rootScope, $scope, $timeout,$switchView) {
            $switchView.switch('.loadding','.login',1,function(){
                //$scope.show = false;
            });
            //$timeout(function(){
            //
            //},1000);
        }]);
    });
return null;
})