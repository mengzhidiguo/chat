define(['angularApp'], function (app) {
    app.controller('friendController', ['$rootScope', '$scope', '$timeout', '$switchView', function ($rootScope, $scope,
                                                                                                     $timeout, $switchView) {
        $scope.$on('friendshow', function (evt, data) {
            $scope.friendHide = false;
        });
        $scope.chat = function (event) {
            event = event || window.event;
            event = angular.element(event.target);
            if (event.length === 0) {
                console.log('没有获取到target对象');
                return;
            }
            if (event.nodeName !== 'LI')
                event = event.parent('LI');
            $scope.$emit('friend',{name:event.find('h4').text()});
        };
        $scope.$on('friendGo',function(evt, next, current){
            $switchView.switch('.friend', '.chat', 1, function () {
            });
        });
        $scope.menushow = function () {
            $switchView.switch('.friend', '.menu', 1, function () {
            });
        };

    }]);
    return null;
});