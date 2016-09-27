'use strict';

/**
 * @ngdoc service
 * @name feedmeApp.getPosts
 * @description
 * # getPosts
 * Factory in the feedmeApp.
 */
angular.module('feedMeMoreApp')
  .factory('allPosts', function ($http) {

    return {

      createPost: function(title,content) {

        var data = {
            query: 'mutation createPostQuery($input_0: _CreatePostInput!){ createPost(input: $input_0){ changedPost { id createdAt modifiedAt title content } } } ',
            variables: {"input_0": {"title": title,"content" : content }}
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");

            return result;
        });

      },

      getPosts: function () {

        var data = {
            query: 'query { viewer{ allPosts(first: 20000) { edges { node { id createdAt modifiedAt title content } } }  } } ',
            variables: ""
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);
        });

      },

      getThreePosts: function () {

        var data = {
            query: 'query { viewer{ allPosts(first: 20000) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: ""
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);

            return result;
        });

      },

      getNextPosts: function(cursor) {

        var data = {
            query: 'query getNextPosts ($cursor: String){ viewer{ allPosts(first: 3, after: $cursor) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: {"cursor": cursor}
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);

            return result;
        });
      },

      getPreviousPosts: function(cursor) {

        var data = {
            query: 'query getNextPosts ($cursor: String){ viewer{ allPosts(last: 3, before: $cursor) { edges { node { id createdAt modifiedAt title content } cursor } pageInfo { hasNextPage hasPreviousPage count } } } } ',
            variables: {"cursor": cursor}
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);

            return result;
        });
      },

      deletePost: function(postID) {

        var data = {
            query: 'mutation deletePostQuery($input_0: _DeletePostInput!){ deletePost(input: $input_0){ changedPost { id createdAt modifiedAt title content  } } } ',
            variables: {"input_0": {"id" : postID}}
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);

            return result;
        });
      }

    };

  });

angular.module('feedMeMoreApp').directive('navMenu',function() {
    return {
      restrict: 'AE',
      replace: 'false',
      templateUrl: '/scripts/directives/navMenuTemplate.html',
      link: function(scope,elem,attrs) {

      }
    };
  });
