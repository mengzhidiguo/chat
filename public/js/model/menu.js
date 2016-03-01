define(['angularApp'], function (app) {
    app.controller('menuController', ['$rootScope', '$scope', '$timeout','$switchView', function ($rootScope, $scope,
                                                                                                  $timeout,$switchView) {
        //$scope.menuHide = true;

        $scope.menu = [
            {name:'聊天'},
            {name:'好友列表'},
            {name:'朋友圈'},
            {name:'附近的人'},
            {name:'游戏'},
            {name:'注销'},
        ];

        $scope.friendShow = function (event) {
            event = event || window.event;
            event = angular.element(event.target);
            console.log(event)
            if(event.text() === '好友列表'){
                $switchView.switch('.menu','.friend',1,function(){
                });
                //$scope.menuHide = true;
                //$rootScope.$broadcast('friendshow', '');
            }
        };
        //$scope.$on('menushow', function (evt, data) {
        //    $scope.menuHide = false;
        //});
    }]);
})