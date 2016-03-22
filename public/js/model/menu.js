define(['angularApp'], function (app) {
    app.controller('menuController', ['$rootScope', '$scope', '$timeout', '$switchView', function ($rootScope, $scope,
                                                                                                   $timeout, $switchView) {
        $scope.config = {
            menu: [                     //菜单名称
                {name: '聊天'},
                {name: '好友列表'},
                {name: '朋友圈'},
                {name: '附近的人'},
                {name: '游戏'},
                {name: '注销'},
            ],
            username: 'fdsafas',
        };

        //接受root广播
        //code:0    接收username
        $scope.$on('menu', function (msg) {
            var msg = arguments[1];
            switch (msg.code) {
                case 0:
                    $scope.config.username = msg.msg.name;
                    break;
            }
        });

        //事件处理程序
        $scope.friendShow = function (event) {
            //console.log(event);
            if (event === undefined) {
                return;
            }
            event = angular.element(event.target);
            if (event.text() === '好友列表') {
                $switchView.switch('.menu', '.friend', 1, function () {
                });
            }
        };
    }]);
})