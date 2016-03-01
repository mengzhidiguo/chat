define(['angularApp'],function(app){
    app.controller('chatlistController', ['$rootScope', '$scope', '$timeout','$socket','$switchView', function ($rootScope, $scope, $timeout, $socket,$switchView) {
        $scope.A = [
            {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
            {type: 3, time:'2016-2-29 12:00'},
            {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
            {type: 2, imgSrc: './image/friend_name_06.png', body: '不是'},
            {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        ];
        $scope.back = function () {
            $switchView.switch('.chat','.friend',1,function(){
            });
        }

        //发送信息,向A数组添加数据
        $scope.send = function(){
            if($scope.talk === '' || $scope.talk ===undefined)
                return;
            $scope.A.push({type: 2, imgSrc: './image/friend_name_06.png', body: $scope.talk})
            $socket.emit('chat', {type: 1, body:$scope.talk });
            $scope.talk = '';
        }

        $scope.c = true;
        $socket.on('chat', function (msg) {
            if (msg.code == 1) {
                console.log('接受到错误信息：');
                console.log(msg);
            } else if (msg.code == 0) {
                if(msg.type===1){
                    if(msg.imgSrc === undefined)
                        msg.imgSrc = './image/friend_name_06.png';
                    $scope.A.push({type: 1, imgSrc: msg.imgSrc, body: msg.body})
                }

            }
        });

        //ng-repeate完成之后调用这个函数  更新isScroll
        $scope.repeatDone = function(){
            zhKeep.chatScroll.refresh();
            zhKeep.chatScroll.scrollToElement(document.querySelectorAll('.chat_contain ul li')[document.querySelectorAll('.chat_contain ul li').length-1]);
        }
    }]);

    return null;
})
