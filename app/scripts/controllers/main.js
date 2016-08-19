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
    // Queries db and returns array of all posts in descending chronological order
    allPosts.getPosts().success(function(data) {
      var posts = data.data.viewer.allPosts.edges;
      console.log(posts);

      $scope.posts = posts;
    });

    // Queries db and return array of three posts to show on home page
    allPosts.getThreePosts().success(function(data) {
      var threePosts = data.data.viewer.allPosts.edges;
      $scope.threePosts = threePosts;
    });

    // Returns next three posts on button click
    $scope.getNextPosts = function() {

      allPosts.getNextPosts($scope.threePosts[$scope.threePosts.length-1].cursor).success(function(result) {
        $scope.threePosts = result.data.viewer.allPosts.edges;
      });
    };

    // Returns previous three posts on button click
    $scope.getPreviousPosts = function () {

      allPosts.getPreviousPosts($scope.threePosts[0].cursor).success(function(result) {
          $scope.threePosts = result.data.viewer.allPosts.edges;
      });
    };    

    // Add a new post to the db, takes title and content as paramaters
    $scope.createPost = function() {

      //Define title and content variables to be passed as paramaters
      var title = document.getElementById('$new_post_title').value;
      var content = document.getElementById('$new_post_content').value;
      var submitButton = angular.element(document.querySelector('#submit_button'));

      submitButton.removeClass('pulse');

      allPosts.createPost(title,content).then(function(result) {

        // Animates submit button when post successfully submits
        submitButton.addClass('pulse');


        // Format data in the way the HTML expects to receive it
        var newPost = {
          "node": {
            "content" : result.data.data.createPost.changedPost.content,
            "title" : result.data.data.createPost.changedPost.title,
            "createdAt" : result.data.data.createPost.changedPost.createdAt
          }
        };

        // Updates array of posts to reflect new posts in real time
        $scope.posts.unshift(newPost);

        // Clears title and content containers on successful post submission
        document.getElementById('$new_post_title').value='';
        document.getElementById('$new_post_content').value='';




      });
    };

    // Delete post from admin view and database
    $scope.deletePost = function(postID) {

      allPosts.deletePost(postID).success(function(result) {

        for (var i=0; i<$scope.posts.length; i++) {
          if ($scope.posts[i].node.id === result.data.deletePost.changedPost.id) {
            $scope.posts.splice(i,1);
            break;
          }
        }
      });
    };



});
