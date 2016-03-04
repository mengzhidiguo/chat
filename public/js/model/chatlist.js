define(['angularApp'], function (app) {
    app.controller('chatlistController', ['$rootScope', '$scope', '$timeout', '$socket', '$switchView', function ($rootScope, $scope, $timeout, $socket, $switchView) {
        //$scope.chatInfoList = [
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //    {type: 3, time: '2016-2-29 12:00'},
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //    {type: 2, imgSrc: './image/friend_name_06.png', body: '不是'},
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //];
        $scope.config ={
            chatInfoList:[],       //当前聊天信息
            name:'',               //当前聊天对象名称
            chat:{},               //全部好友聊天信息
        };

        //angular 本地广播信息


        //code :0  当前聊天对象发生改变 切换聊天信息列表  切换聊天者name
        //code :1  好友列表发生改变  更新好友列表信息
        $scope.$on('chat', function () {
            var msg = arguments[1];
            switch (msg.code){
                case 0:
                    $scope.config.chatInfoList =   $scope.config.chat[msg.msg.name];
                    $scope.config.name = msg.msg.name;
                    break;
                case 1:
                    for (var a  in $rootScope.config.friendList) {
                        if($scope.config.chat[a] === undefined)
                            $scope.config.chat[a] = [];
                    }
                    break;
            }
        });
        $scope.$on('keydown',function(){
            var msg = arguments[1];
            if(msg.currentView = 'chat'){
                switch (msg.code){
                    //回车键 enter
                    case 13:
                        $scope.send();
                        break;
                }
            }
        });



        //chat视图 事件回调函数



        //返回好友列表
        $scope.back = function () {
            $switchView.switch('.chat', '.friend', 1, function () {
            });
        }

        //发送信息,向A数组添加数据
        $scope.send = function () {
            if ($scope.talk === '' || $scope.talk === undefined)
                return;
            $scope.config.chatInfoList.push({type: 2, imgSrc: './image/friend_name_06.png', body: $scope.talk});
            $socket.emit('chat', {type: 1, from: $rootScope.userInfo.username, to: $scope.config.name, body: $scope.talk});
            $scope.talk = '';
        };
        //ng-repeate完成之后调用这个函数  更新isScroll
        $scope.repeatDone = function () {
            zhKeep.chatScroll.refresh();
            zhKeep.chatScroll.scrollToElement(document.querySelectorAll('.chat_contain ul li')[document.querySelectorAll('.chat_contain ul li').length - 1]);
        };


        //服务器socket信息

        //接受chat的socket信息
        $socket.on('chat', function (msg) {
            if (msg.code == 1) {
                console.log('接受到错误信息：');
                console.log(msg);
            } else if (msg.code == 0) {
                if (msg.type === 1) {
                    if (msg.imgSrc === undefined)
                        msg.imgSrc = './image/friend_name_06.png';
                    if(msg.from == $scope.name){
                        $scope.config.chatInfoList.push({type: 1, imgSrc: msg.imgSrc, body: msg.body});
                    }else{
                        if($scope.config.chat[msg.from] !== undefined)
                            $scope.config.chat[msg.from].push({type: 1, imgSrc: msg.imgSrc, body: msg.body});
                    }
                }
            }
        });


    }]);

    return null;
})
