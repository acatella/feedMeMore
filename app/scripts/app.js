'use strict';

/**
 * @ngdoc overview
 * @name feedMeMoreApp
 * @description
 * # feedMeMoreApp
 *
 * Main module of the application.
 */
angular
  .module('feedMeMoreApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/club-history', {
        templateUrl: 'views/club-history.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/club-rules', {
        templateUrl: 'views/club-rules.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/staff', {
        templateUrl: 'views/staff.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/swim-team', {
        templateUrl: 'views/swim-team.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/adult-swim', {
        templateUrl: 'views/adult-swim.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/waterpolo', {
        templateUrl: 'views/waterpolo.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/swim-lessons', {
        templateUrl: 'views/swim-lessons.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/tennis-team', {
        templateUrl: 'views/tennis-team.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/adult-tennis', {
        templateUrl: 'views/adult-tennis.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/tennis-lessons', {
        templateUrl: 'views/tennis-lessons.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/events', {
        templateUrl: 'views/events.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/pool-cues', {
        templateUrl: 'views/pool-cues.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/membership', {
        templateUrl: 'views/membership.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/nav-test', {
        templateUrl: 'views/nav-test.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
