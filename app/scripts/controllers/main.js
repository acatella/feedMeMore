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
    $scope.mobileMenuFull = false;

    // Site Document Locations
    $scope.siteDocuments = {
      "clubRecords": "https://drive.google.com/open?id=0B5wq788EginlYmpROHRyMHo2VFU",
      "leagueRecords": "https://drive.google.com/open?id=0B5wq788EginlLUZ2MndtXzdlTDQ",
      "waitlist":"http://res.cloudinary.com/drdgylwuu/image/upload/v1497453896/MemberWaitingList_5-1-2017_fpfbqb.pdf",
      "waitlistApplication":"https://drive.google.com/open?id=0B5wq788EginlNWhSeUIwWDdnRjg",
      "concussionForm":"https://drive.google.com/open?id=0B5wq788EginlNzZsOE5XWnRtd28",
      "participationForm":"https://drive.google.com/open?id=0B5wq788EginlRWlhb1pScG9KdzA",
      "missingMeetForm":"http://res.cloudinary.com/drdgylwuu/image/upload/v1493851999/2017_missing_meet_o6sg8k.pdf",
      "articlesInc":"https://drive.google.com/open?id=0B5wq788EginlazNjRFA4VTRnRlk",
      "bylaws":"https://drive.google.com/open?id=0B5wq788EginlcUtmTzFTeUp0ZVE",
      "meetingFlyer": "http://res.cloudinary.com/drdgylwuu/image/upload/v1493851999/2017_meeting_flyer_mqwqdp.pdf",
      "waterpoloInfo": "http://res.cloudinary.com/drdgylwuu/image/upload/v1502163970/VRWP.2017_Info_2_g0urmq.pdf",
      "adForm": "http://res.cloudinary.com/drdgylwuu/image/upload/v1499811830/VRSTC_Northern_Division_Finals_2017_Advertising_ldoiq0.pdf"
    };

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
            // Staff page not ready for launch
            // {
            //   "header": "Staff",
            //   "linkAddress": "staff"
            // }
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
      if (pageNumber+3 >= posts.length) {
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
    allPosts.getPosts().then(function(data) {      
      var posts = data.data.data.viewer.allPosts.edges;

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

      allPosts.deletePost(postID).then(function(result) {

        for (var i=0; i<$scope.posts.length; i++) {
          if ($scope.posts[i].node.id === result.data.data.deletePost.changedPost.id) {
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
          $scope.menus[i] = false;
        }

        $scope.menus[menuItem] = true;
      }
    };

    // Hides all mobile menus when clicked
    $scope.toggleMobileMenus = function(menuItem)  {
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


    // Alters club rules button text and positioning on click
    function clubRules() {

      var buttonPosition = {
        "general" : {
          "name" : "general",
          "pos" : "absolute",
          "text" : "View All Rules"
        },
        "pool" : {
          "name" : "pool",
          "pos" : "absolute",
          "text" : "View All Rules"
        },
        "tennisCourtSummer" : {
          "name" : "tennisCourtSummer",
          "pos" : "absolute",
          "text" : "View All Rules"
        },
        "tennisCourtOffSeason" : {
          "name" : "tennisCourtOffSeason",
          "pos" : "absolute",
          "text" : "View All Rules"
        },
        "guestPolicy" : {
          "name" : "guestPolicy",
          "pos" : "absolute",
          "text" : "View All Rules"
        }
      };


      return {
        getButtonPostition: function(button) {
          return buttonPosition[button].pos;
        },
        getButtonText: function(button) {
          return buttonPosition[button].text;
        },
        updateButton: function(button) {
          if (buttonPosition[button].pos == "absolute") {
            buttonPosition[button].pos = "relative";
            buttonPosition[button].text = "Hide Rules";
          }
          else {
            buttonPosition[button].pos = "absolute";
            buttonPosition[button].text = "View All Rules";
          }
        }
      };
    };

    $scope.ClubRulesButton = clubRules();

});
