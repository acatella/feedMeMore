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

    // Global variables
    // var threePosts = [];
    $scope.hasNextPage = false;
    $scope.hasPreviousPage = false;
    var pageNumber = 0;
    $scope.aboutMenu = {visibility: false};
    $scope.aquaticsMenu = {visibility: false};
    $scope.tennisMenu = {visibility: false};
    $scope.eventsMenu = {visibility: false};
    $scope.menus = [$scope.aboutMenu,$scope.aquaticsMenu,$scope.tennisMenu,$scope.eventsMenu];

    // Methods to determine if previous and next buttons display
    // function checkNextPage(pageInfo) {
    //     if (pageInfo.hasNextPage) {
    //       $scope.hasNextPage = true;
    //     }
    //     else {
    //       $scope.hasNextPage = false;
    //     }
    // }
    //
    // function checkPreviousPage() {
    //   if (pageNumber > 0) {
    //     $scope.hasPreviousPage = true;
    //   }
    //   else {
    //     $scope.hasPreviousPage = false;
    //   }
    // }

    // Methods to determine when to show prev/next buttons
    function showNextButton(posts) {
      if (pageNumber+2 >= posts.length) {
        $scope.hasNextPage = false;
      } else {
        $scope.hasNextPage = true;
      }
    }

    function showPreviousButton() {
      if (pageNumber <= 0) {
        $scope.hasPreviousPage = false;
      } else {
        $scope.hasPreviousPage = true;
      }
    }

    // Queries db and returns array of all posts in descending chronological order
    allPosts.getPosts().success(function(data) {
      var posts = data.data.viewer.allPosts.edges;
      console.log(posts);

      $scope.posts = posts;
      $scope.threePosts = $scope.posts.slice(pageNumber,pageNumber+3);
      showPreviousButton($scope.posts);
      showNextButton($scope.posts);
    });

    // Shows next posts
    $scope.showNextThree = function() {
      pageNumber += 3;
      if (pageNumber + 2 > $scope.posts.length-1) {
          $scope.threePosts = $scope.posts.slice(pageNumber);
      } else {
          $scope.threePosts = $scope.posts.slice(pageNumber,pageNumber+3);
      }
      showPreviousButton($scope.posts);
      showNextButton($scope.posts);
    };

    // Shows previous posts
    $scope.showPreviousThree = function() {
      pageNumber -= 3;
      if (pageNumber - 2 < 0) {
        $scope.threePosts = $scope.posts.slice(0,3);
      } else {
        $scope.threePosts = $scope.posts.slice(pageNumber,pageNumber+3);
      }
      showPreviousButton($scope.posts);
      showNextButton($scope.posts);
    };

    // Queries db and return array of three posts to show on home page
    // allPosts.getThreePosts().success(function(data) {
    //   threePosts = data.data.viewer.allPosts.edges;
    //   $scope.threePosts = threePosts;
    //   checkNextPage(data.data.viewer.allPosts.pageInfo);
    //   checkPreviousPage(data.data.viewer.allPosts.pageInfo);
    // });

    // Returns next three posts on button click
    // $scope.getNextPosts = function() {
    //
    //   allPosts.getNextPosts($scope.threePosts[$scope.threePosts.length-1].cursor).success(function(data) {
    //     pageNumber += 1;
    //     $scope.threePosts = data.data.viewer.allPosts.edges;
    //     console.log($scope.threePosts);
    //     checkNextPage(data.data.viewer.allPosts.pageInfo);
    //     checkPreviousPage(data.data.viewer.allPosts.pageInfo);
    //   });
    // };

    // Returns previous three posts on button click
    // $scope.getPreviousPosts = function () {
    //   pageNumber -= 1;
    //   allPosts.getPreviousPosts($scope.threePosts[0].cursor).success(function(data) {
    //       $scope.threePosts = data.data.viewer.allPosts.edges;
    //       console.log($scope.threePosts);
    //       data.data.viewer.allPosts.pageInfo.hasNextPage = true;
    //       checkNextPage(data.data.viewer.allPosts.pageInfo);
    //       checkPreviousPage(data.data.viewer.allPosts.pageInfo);
    //   });
    // };

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

    // Hides all menus when menu is clicked
    $scope.toggleMenus = function(menuItem) {
      if (menuItem.visibility === true ) {
        menuItem.visibility = false;
        return;
      }

      else {
        for (var i=0; i<$scope.menus.length;i++) {
          console.log($scope.menus[i].visibility);
          $scope.menus[i].visibility = false;
        }

        menuItem.visibility = true;
      }
    };    

});
