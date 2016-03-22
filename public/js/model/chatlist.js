define(['angularApp'], function (app) {
    app.controller('chatlistController', ['$rootScope', '$scope', '$timeout', '$socket', '$switchView','$getAudioMedia', function ($rootScope, $scope, $timeout, $socket, $switchView,$getAudioMedia) {
        //$scope.chatInfoList = [
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //    {type: 3, time: '2016-2-29 12:00'},
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //    {type: 2, imgSrc: './image/friend_name_06.png', body: '不是'},
        //    {type: 1, imgSrc: './image/friend_name_06.png', body: '哈哈哈'},
        //];
        $scope.config = {
            chatInfoList: [],       //当前聊天信息
            name: '',               //当前聊天对象名称
            chat: {},               //全部好友聊天信息
        };
        $scope.voiceInfoShow = true;
        //angular 本地广播信息


        //code :0  当前聊天对象发生改变 切换聊天信息列表  切换聊天者name
        //code :1  好友列表发生改变  更新好友列表信息
        $scope.$on('chat', function () {
            var msg = arguments[1];
            switch (msg.code) {
                case 0:
                    $scope.config.chatInfoList = $scope.config.chat[msg.msg.name];
                    $scope.config.name = msg.msg.name;
                    break;
                case 1:
                    for (var a  in $rootScope.config.friendList) {
                        if ($scope.config.chat[a] === undefined)
                            $scope.config.chat[a] = [];
                    }
                    break;
            }
        });
        $scope.$on('keydown', function () {
            var msg = arguments[1];
            if (msg.currentView = 'chat') {
                switch (msg.code) {
                    //回车键 enter
                    case 13:
                        $scope.send();
                        break;
                }
            }
        });


        //chat视图 事件回调函数


        //语音消息   录音开始
        $scope.voiceStart = function(){

            if(false === $getAudioMedia.start()){
                alert('不支持获取音频 请更新浏览器');
                return;
            }
            $scope.voiceInfoShow = false;
            $scope.$apply();

        };
        //语音消息   录音结束
        $scope.voiceEnd = function(){
            //停止录制
            $getAudioMedia.end(function(stream){
                //获取音频流 发送



                $socket.emit('voice',{
                    type: 2,
                    from: $rootScope.userInfo.username,
                    to: $scope.config.name,
                    stream: stream.result
                });
                $scope.config.chatInfoList.push({type: 2,msgtype:2, imgSrc: './image/friend_name_06.png',stream:stream.result});
                $scope.voiceInfoShow = true;
                $scope.$apply();
            });
            //关闭信息框  并开始脏检查

        };
        //播放音频
        $scope.voicePlay = function(e){

            var audio = new Audio();
            audio = (audio===undefined)?document.createElement('audio'):audio;
            audio.src = angular.element(e.target).attr('data-stream');
            audio.play();
        };


        //返回好友列表
        $scope.back = function () {
            $switchView.switch('.chat', '.friend', 1, function () {
            });
        };

        //发送信息,向A数组添加数据
        $scope.send = function () {
            if ($scope.talk === '' || $scope.talk === undefined)
                return;
            $scope.config.chatInfoList.push({type: 2,msgtype:1, imgSrc: './image/friend_name_06.png', body: $scope.talk});
            $socket.emit('chat', {
                type: 1,
                from: $rootScope.userInfo.username,
                to: $scope.config.name,
                body: $scope.talk
            });
            $scope.talk = '';
        };
        //ng-repeate完成之后调用这个函数  更新isScroll
        $scope.repeatDone = function () {
            zhKeep.chatScroll.refresh();
            zhKeep.chatScroll.scrollToElement(document.querySelectorAll('.chat_contain ul li')[document.querySelectorAll('.chat_contain ul li').length - 1]);
        };


        //服务器socket信息


        //type :1 左边消息  type :2 右边消息  type:3 时间消息   msgtype:0 时间消息  msgtype :1 文本消息 msgtype :2 语音消息
        //接受chat的socket信息
        $socket.on('chat', function (msg) {
            if (msg.code == 1) {
                console.log('接受到错误信息：');
                console.log(msg);
            } else if (msg.code == 0) {
                switch(msg.type){
                    case 1: //文本消息
                        if (msg.imgSrc === undefined)
                            msg.imgSrc = './image/friend_name_06.png';
                        if (msg.from == $scope.name) {
                            $scope.config.chatInfoList.push({type: 1,msgtype:1, imgSrc: msg.imgSrc, body: msg.body});
                        } else {
                            if ($scope.config.chat[msg.from] !== undefined)
                                $scope.config.chat[msg.from].push({type: 1,msgtype:1, imgSrc: msg.imgSrc, body: msg.body});
                        }
                        break;
                    case 2://语音消息
                        if (msg.from == $scope.name) {
                            $scope.config.chatInfoList.push({type: 1,msgtype:2, imgSrc: msg.imgSrc, stream: msg.stream});
                        } else {
                            if ($scope.config.chat[msg.from] !== undefined)
                                $scope.config.chat[msg.from].push({type: 1,msgtype:2, imgSrc: msg.imgSrc, stream: msg.stream});
                        }

                        //
                        //var audio = window.document.createElement('audio');
                        //audio.src = event.target.result;
                        //audio.controls = true;
                        //myAudio.appendChild(audio);
                        break;

                }


            }

        });


    }]);

    return null;
})
