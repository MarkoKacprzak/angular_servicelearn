(function () {
    "use strict";
    function BooksResource($resource) {
        return $resource('api/books/:book_id', {book_id: '@book_id'},
                {
            'update': {method: 'PUT'}
        });
    }
    angular.module('app')
        .factory('BooksResource', ['$resource', BooksResource]);
}());