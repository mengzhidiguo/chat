define(['angularApp'],function(app){
    //登录控制器
    app.controller('loginController', ['$rootScope', '$scope', '$timeout', '$socket','$switchView', function ($rootScope, $scope, $timeout,
                                                                                                              $socket,$switchView) {
        //提示框是否显示
        $scope.c = false;
        //提示信息内容
        $scope.info = null;

        //发送按钮点击事件
        $scope.send = function () {
            $socket.emit('login', {username: $scope.username, password: $scope.password});
            $scope.c = true;
            $socket.on('login', function (msg) {
                switch(msg.code){
                    //登录成功
                    case 0:
                        $scope.info = msg.msg;
                        $switchView.switch('.login','.menu',1,function(){});
                        break;
                    //用户名错误或者密码错误
                    case 1:
                        $scope.info = msg.msg;
                        $timeout(function () {
                            $scope.c = false;
                            $scope.info = '';
                        }, 500);
                        break;
                    case 2:
                        $scope.info = msg.msg;
                        $timeout(function () {
                            $scope.c = false;
                            $scope.info = '';
                        }, 500);
                        break;
                        break;
                    default:
                        $scope.info = '未知错误';
                        $timeout(function () {
                            $scope.c = false;
                            $scope.info = '';
                        }, 500);
                }
            });
        }
    }]);
})
