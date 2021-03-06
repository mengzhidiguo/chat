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
                if (msg.code == 1) {
                    $scope.info = msg.msg;
                    $timeout(function () {
                        $scope.c = false;
                    }, 500);
                } else if (msg.code == 0) {
                    console.log(msg.msg);
                    $scope.info = msg.msg;
                    //登录成功
                    $switchView.switch('.login','.menu',1,function(){});
                }
            });
        }
    }]);
})
