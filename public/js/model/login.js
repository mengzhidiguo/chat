define(['angularApp'],function(app){
    //登录控制器
    app.controller('loginController', ['$rootScope', '$scope', '$timeout', '$socket','$switchView', function ($rootScope, $scope, $timeout,
                                                                                                              $socket,$switchView) {
        $scope.config = {
            tipIsShow:false,        //提示框是否显示
            info:null,              //提示信息内容
        };

        //发送按钮点击事件
        $scope.send = function () {
            $socket.emit('login', {username: $scope.username, password: $scope.password});
            $scope.config.tipIsShow = true;
            $socket.on('login', function (msg) {
                switch(msg.code){
                    //登录成功
                    case 0:
                        $rootScope.config.username = $scope.username;
                        $scope.config.info = msg.msg;
                        $switchView.switch('.login','.menu',1,function(){
                        });
                        break;
                    //用户名错误或者密码错误
                    case 1:
                        $scope.config.info = msg.msg;
                        $timeout(function () {
                            $scope.config.tipIsShow = false;
                            $scope.config.info = '';
                        }, 500);
                        break;
                    case 2:
                        $scope.config.info = msg.msg;
                        $timeout(function () {
                            $scope.config.tipIsShow = false;
                            $scope.config.info = '';
                        }, 500);
                        break;
                        break;
                    default:
                        $scope.config.info = '未知错误';
                        $timeout(function () {
                            $scope.config.tipIsShow = false;
                            $scope.config.info = '';
                        }, 500);
                }
            });
        }
    }]);
})
