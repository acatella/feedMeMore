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

    $scope.eventSources = [];
    
    // Global variables
    $scope.hasNextPage = false;
    $scope.hasPreviousPage = false;
    var pageNumber = 0;
    $scope.menus = [ false, false, false, false ];
    $scope.mobileMenus = [ false, false, false, false ];

    // Function to open and close a nav menu when clicked
    $scope.toggleNav = function(index,event) {
      for (var i=0; i<=$scope.menus.length-1; i++) {
        if (i === index) {
          if ($scope.menus[i] == false) {
            $scope.menus[i] = true;
          }

          else {$scope.menus[i] = false;}

          // $scope.menus[i] = !$scope.menus[i];
        } else {$scope.menus[i] = false;}
      }
      event.stopPropagation();
    };

    $scope.closeNav = function(e) {
      for (var i=0; i<=$scope.menus.length-1; i++) {
        $scope.menus[i] = false;
      }
      e.stopPropagation();
    };

    // Array and objects to define nav menus
    $scope.menuItems = [
        {
          "title": "About",
          "listItems": [
            {
              "header": "Club History",
              "linkAddress": "club-history"
            },
            {
              "header": "Membership",
              "linkAddress": "membership"
            },
            {
              "header": "Club Rules",
              "linkAddress": "club-rules"
            },
            {
              "header": "Board of Directors",
              "linkAddress": "board"
            },
            {
              "header": "Staff",
              "linkAddress": "staff"
            }
          ]
        },
          {
            "title": "Aquatics",
            "listItems": [
              {
                "header": "Swim Team",
                "linkAddress": "swim-team"
              },
              {
                "header": "Adult Team",
                "linkAddress": "adult-swim"
              },
              {
                "header": "Water Polo",
                "linkAddress": "waterpolo"
              },
              {
                "header": "Lessons",
                "linkAddress": "swim-lessons"
              }
            ]
          },
          {
            "title": "Tennis",
            "listItems": [
              {
                "header": "Tennis Team",
                "linkAddress":"tennis-team"
              },
              {
                "header": "Adult Tennis",
                "linkAddress": "adult-tennis"
              },
              {
                "header": "Lessons",
                "linkAddress": "tennis-lessons"
              }
            ]
          },
          {
            "title": "Events",
            "listItems": [
              {
                "header": "Calendar",
                "linkAddress": "calendar"
              },
              {
                "header": "Club Events",
                "linkAddress": "events"
              }
            ]
          }
    ];

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

      if ($scope.menus[menuItem] === true && menuItem !== 'closeAll') {
        $scope.menus[menuItem] = false;
        return;
      }

      else {
        for (var i=0; i<$scope.menus.length;i++) {
          console.log($scope.menus[i]);
          $scope.menus[i] = false;
        }

        $scope.menus[menuItem] = true;
      }
    };

    // Hides all mobile menus when clicked
    $scope.toggleMobileMenus = function(menuItem)  {
      console.log($scope.mobileMenus[menuItem]);
      if ($scope.mobileMenus[menuItem] === true && menuItem !== 'closeAll') {
        $scope.mobileMenus[menuItem] = false;
        return;
      }

      else {
        for (var i=0; i<$scope.mobileMenus.length;i++) {
          $scope.mobileMenus[i] = false;
        }

        $scope.mobileMenus[menuItem] = true;
      }
    };

    // Alters club rules button text and positioning
    $scope.gpButtonPosition = "absolute";
    $scope.gpButtonText = "View All Rules";
    $scope.updateGpButton = function() {
      if ($scope.gpButtonPosition == "absolute") {
        $scope.gpButtonPosition = "relative";
        $scope.gpButtonText = "Hide Rules";
      }
      else {
        $scope.gpButtonPosition = "absolute";
        $scope.gpButtonText = "View All Rules";
      }

    };

    $scope.tcrButtonPosition = "absolute";
    $scope.tcrButtonText = "View All Rules";
    $scope.updateTcrButton = function() {
      if ($scope.tcrButtonPosition == "absolute") {
        $scope.tcrButtonPosition = "relative";
        $scope.tcrButtonText = "Hide Rules";
      }
      else {
        $scope.tcrButtonPosition = "absolute";
        $scope.tcrButtonText = "View All Rules";
      }

    };

    $scope.trButtonPosition = "absolute";
    $scope.trButtonText = "View All Rules";
    $scope.updateTrButton = function() {
      if ($scope.trButtonPosition == "absolute") {
        $scope.trButtonPosition = "relative";
        $scope.trButtonText = "Hide Rules";
      }
      else {
        $scope.trButtonPosition = "absolute";
        $scope.trButtonText = "View All Rules";
      }

    };

    $scope.prButtonPosition = "absolute";
    $scope.prButtonText = "View All Rules";
    $scope.updatePrButton = function() {
      if ($scope.prButtonPosition == "absolute") {
        $scope.prButtonPosition = "relative";
        $scope.prButtonText = "Hide Rules";
      }
      else {
        $scope.prButtonPosition = "absolute";
        $scope.prButtonText = "View All Rules";
      }

    };

    $scope.crButtonPosition = "absolute";
    $scope.crButtonText = "View All Rules";
    $scope.updateCrButton = function() {
      if ($scope.crButtonPosition == "absolute") {
        $scope.crButtonPosition = "relative";
        $scope.crButtonText = "Hide Rules";
      }
      else {
        $scope.crButtonPosition = "absolute";
        $scope.crButtonText = "View All Rules";
      }

    };
});
