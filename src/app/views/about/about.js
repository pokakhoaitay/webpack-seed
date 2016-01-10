/**
 * Created by Poka on 1/9/2016.
 */
angular.module('app.about', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('root.about', {
                url: '/about',
                views:{
                    '@':{
                        template:require("./about.html"),
                        controller: 'AboutCtrl',
                    }
                }

            })
    })

    .controller('AboutCtrl', function ($scope) {
        $scope.data = 'About';
    })