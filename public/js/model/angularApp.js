define(['angular','io'], function (angular,io) {

    var app = angular.module('chat', []);

    app.service('$socket',function($rootScope){
        var socket = io();
        this.on =function (eventName, callback) {
            socket.on(eventName, function (msg) {
                callback(msg);
                $rootScope.$apply();
            })
        };
        this.emit =function (eventName, data) {
            socket.emit(eventName, data)
        };
    })


    //登录控制器
    app.controller('loginController', ['$rootScope','$scope','$timeout', '$socket', function ($rootScope,$scope, $timeout, $socket) {
        //提示框是否显示
        $scope.c = false;
        //提示信息内容
        $scope.info = null;

        //发送按钮点击事件
        $scope.send = function () {
            $socket.emit('login', {username: $scope.username, password: $scope.password});
            $scope.c = true;
            $socket.on('login', function (msg) {
               if(msg.code==1){
                   $scope.info = msg.msg;
                   $timeout(function(){
                       $scope.c = false;
                   },500);
               }else if(msg.code == 0){
                   $scope.info = msg.msg;
                   //登录成功
                   $timeout(function(){
                       $scope.loginHide = true;
                       $rootScope.$broadcast('menushow', '');
                   },500);
                }
            });
        }
    }]);


    app.controller('menuController',['$rootScope','$scope','$timeout',function($rootScope,$scope,$timeout){
        $scope.menuHide = true;

        $scope.friendShow = function(){
            console.log('dddd')
            $scope.menuHide = true;
            $rootScope.$broadcast('friendshow', '');
        };
        $scope.$on('menushow',function(evt, data){
            $scope.menuHide = false;
        });
    }]);



    app.controller('friendController',['$rootScope','$scope','$timeout',function($rootScope,$scope,$timeout){
        $scope.friendHide = true;
        $scope.$on('friendshow',function(evt, data){
            $scope.friendHide = false;
        });
        $scope.chat = function(){
            $scope.friendHide = true;
            $rootScope.$broadcast('chatshow', '');
        };
    }]);


    app.controller('chatlistController', ['$rootScope','$scope','$timeout',function($rootScope,$scope,$timeout){
        $scope.chatlistHide = true;
        $scope.$on('chatshow',function(evt, data){
            console.log(data)
        })
    }]);



    return app;
});
