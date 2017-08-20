'use strict';

angular.module('LodashImplementation')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/home/home.view.html'
            })
            .when('/Size', {
                controller: 'methodController',
                templateUrl: 'app/components/method/method.view.html'
            })
            .when('/Shuffle', {
                controller: 'methodController',
                templateUrl: 'app/components/method/method.view.html'
            })
            .when('/Includes', {
                controller: 'methodController',
                templateUrl: 'app/components/method/method.view.html'
            })
            .when('/Sample', {
                controller: 'methodController',
                templateUrl: 'app/components/method/method.view.html'
            })
            .when('/Samplesize', {
                controller: 'methodController',
                templateUrl: 'app/components/method/method.view.html'
            })
    }]);