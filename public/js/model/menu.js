define(['angularApp'], function (app) {
    app.controller('menuController', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
        $scope.menuHide = true;

        $scope.friendShow = function () {
            console.log('dddd')
            $scope.menuHide = true;
            $rootScope.$broadcast('friendshow', '');
        };
        $scope.$on('menushow', function (evt, data) {
            $scope.menuHide = false;
        });
    }]);
})