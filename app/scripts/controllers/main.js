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

    //should be able to pass threePosts[2].node.id as parameter to pagination function

    // Add a new post to the db, takes title and content as paramaters
    $scope.createPost = function() {

      //Define title and content variables to be passed as paramaters
      var title = document.getElementById('$new_post_title').value;
      var content = document.getElementById('$new_post_content').value;

      allPosts.createPost(title,content).then(function(result) {

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
      });
    };

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
