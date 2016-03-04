define(['angularApp'], function (app) {
    app.controller('friendController', ['$rootScope', '$scope', '$timeout', '$switchView', function ($rootScope, $scope,
                                                                                                     $timeout, $switchView) {

        $scope.config = {
            friendList:{},      //好友列表信息
        };

        //监听广播信息
        //code :0  切换视图进入聊天界面
        //code :1  更新好友列表
        $scope.$on('friend', function (evt, data) {
            var msg = arguments[1];
            switch(msg.code){
                case 0:
                    $switchView.switch('.friend', '.chat', 1, function () {});
                    break;
                case 1:
                    $scope.config.friendList = $rootScope.config.friendList;
                    break;
            }
        });



        //friend视图事件回调函数
        //选中聊天者对象
        $scope.chat = function (event) {
            event = event || window.event;
            event = angular.element(event.target);
            if (event.length === 0) {
                console.log('没有获取到target对象');
                return;
            }
            if (event.nodeName !== 'LI')
                event = event.parent('LI');

            //通知root  进入name的聊天界面
            $scope.$emit('root',{code:0,msg:{name:event.find('h4').text()}});
        };

        //回到菜单视图
        $scope.menushow = function () {
            $switchView.switch('.friend', '.menu', 1, function () {
            });
        };

    }]);
    return null;
});