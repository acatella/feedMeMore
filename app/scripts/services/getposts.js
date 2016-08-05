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



      getPosts: function () {

        var data = {
            query: 'query { viewer{ allPosts { edges { node { id createdAt modifiedAt title content } } }  } } ',
            variables: ""
        };

        return $http.post("https://api.scaphold.io/graphql/76f8d00e-08f8-4590-ad92-5eba957cc42e", data, function(result) {
            console.log("That was easy!");
            console.log(result);
        })

      }
    };
  });
