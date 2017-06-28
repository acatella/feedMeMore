'use strict';

/**
 * @ngdoc service
 * @name feedmeApp.getPosts
 * @description
 * # getPosts
 * Factory in the feedmeApp.
 */
angular.module('feedMeMoreApp')
  .factory('allPosts',function ($http) {

    return {

      createPost: function(title,content) {

        var data = {
            query: 'mutation CreatePost($create: CreatePostInput!) { createPost(input: $create) { changedPost { content id createdAt title modifiedAt } } }',
            variables: {"create": {"title": title,"content" : content }}
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/vrstc", data, function(result) {
            console.log("That was easy!");

            return result;
        });

      },

      getPosts: function () {

        var data = {
            query: 'query { viewer{ allPosts(first: 20000) { edges { node { id createdAt modifiedAt title content } } }  } } ',
            variables: ""
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/vrstc", data, function(result) {

        });

      },

      getThreePosts: function () {

        var data = {
            query: 'query { viewer{ allPosts(first: 20000) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: ""
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/alias/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            return result;
        });

      },

      getNextPosts: function(cursor) {

        var data = {
            query: 'query getNextPosts ($cursor: String){ viewer{ allPosts(first: 3, after: $cursor) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: {"cursor": cursor}
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/alias/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {

            return result;
        });
      },

      getPreviousPosts: function(cursor) {

        var data = {
            query: 'query getNextPosts ($cursor: String){ viewer{ allPosts(last: 3, before: $cursor) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: {"cursor": cursor}
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/alias/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {

            return result;
        });
      },

      deletePost: function(postID) {

        var data = {
            query: 'mutation deletePostQuery($input_0: _DeletePostInput!){ deletePost(input: $input_0){ changedPost { id createdAt modifiedAt title content  } } } ',
            variables: {"input_0": {"id" : postID}}
        };

        return $http.post("https://us-west-2.api.scaphold.io/graphql/alias/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {

            return result;
        });
      }

    };

  });

// Desktop Nav directive
angular.module('feedMeMoreApp').directive('navMenu',function() {
    return {
      restrict: 'AE',
      replace: 'false',
      templateUrl: 'scripts/directives/navMenuTemplate.html',
      link: function(scope,elem,attrs) {

          // Closes nav when a user clicks outside of a menu
          // $(document).on('click', function(e){
          //   // e.stopPropagation();
          //   if (elem !== e.target && !elem[0].contains(e.target)) {
          //     for (var i=0; i<=scope.menus.length-1; i++) {
          //       scope.menus[i] = false;
          //     }
          //   }
          //
          // });
      }
    };
  });

  // Mobile Nav directive
  angular.module('feedMeMoreApp').directive('mobileNavMenu',function(){
    return {
      restrict: 'AE',
      replace: 'false',
      templateUrl: 'scripts/directives/mobileNavMenuTemplate.html'
    }
  });


 // angular.module('feedMeMoreApp').directive('stopEvent', function () {
 //   return {
 //     restrict: 'A',
 //     link: function(scope, elem, attr) {
 //       if(attr && attr.stopEvent) {
 //         elem.bind(attr.stopEvent, function (e) {
 //             e.stopPropagation();
 //         });
 //       }
 //     }
 //   };
 // });
