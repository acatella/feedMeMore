'use strict';

/**
 * @ngdoc function
 * @name feedMeMoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feedMeMoreApp
 */
/*angular.module('feedMeMoreApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }); */



angular.module('feedMeMoreApp').controller('MainCtrl',function($scope, allPosts) {

    allPosts.getPosts().success(function(data) {
      $scope.posts = data;
      console.log(data);
    });
});
