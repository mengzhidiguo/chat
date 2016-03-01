define(['angularApp'],function(app) {
    app.controller('friendController', ['$rootScope', '$scope', '$timeout','$switchView', function ($rootScope, $scope,
                                                                                                    $timeout,$switchView) {
        //$scope.friendHide = true;
        $scope.$on('friendshow', function (evt, data) {
            $scope.friendHide = false;
        });
        $scope.chat = function (event) {
            event = event || window.event;
            console.log(event.target.nodeName)
            if (event.target.nodeName === 'DIV') {
                $switchView.switch('.friend','.chat',1,function(){
                });
                //$scope.friendHide = true;
                //$rootScope.$broadcast('chatshow', '');
            }
        };
        $scope.menushow = function () {
            $switchView.switch('.friend','.menu',1,function(){
            });
            //$scope.friendHide = true;
            //$rootScope.$broadcast('menushow', '');
        };
    }]);
    return null;
});