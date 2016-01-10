/**
 * Created by Poka on 1/9/2016.
 */
angular.module('app.home', ['ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('root.home', {
                url: '/',
                views:{
                    '@':{
                        template:require("./home.html"),
                        controller: 'HomeCtrl',
                    }
                }

            })
    })


    .controller('HomeCtrl', function ($scope) {
        $scope.data = 'Home';
        $('#eleTest').css({color:'red'})
    })
