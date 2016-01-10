/**
 * Created by Poka on 1/9/2016.
 */


angular.module('app', [
        'app.about',
        'app.home',
        'ui.router'
    ])

    .config(function ($locationProvider, $stateProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('root', {
                abstract: true,
                url: '',
                //views: {
                //    'footer': {
                //        templateUrl: 'views/partials/footer/_footer.html'
                //    },
                //}
            });
    })


