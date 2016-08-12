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

    // Add a new post to the db, takes title and content as paramaters
    $scope.createPost = function() {

      //Define title and content variables
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

        console.log(newPost);
        // Updates array of posts to reflect new posts in real time
        $scope.posts.unshift(newPost);
      });
    };

});
