define(['angularApp'],function(app) {
    app.controller('friendController', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
        $scope.friendHide = true;
        $scope.$on('friendshow', function (evt, data) {
            $scope.friendHide = false;
        });
        $scope.chat = function (event) {
            event = event || window.event;
            console.log(event.target.nodeName)
            if (event.target.nodeName === 'DIV') {
                $scope.friendHide = true;
                $rootScope.$broadcast('chatshow', '');
            }
        };
        $scope.menushow = function () {
            $scope.friendHide = true;
            $rootScope.$broadcast('menushow', '');
        };
    }]);
    return null;
});