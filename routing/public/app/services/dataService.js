(function () {
    "use strict";
    angular.module('app')
        .factory('dataService', dataService);
    function dataService($q, $timeout, logger, $http, constants) {

/* general promise Region */
        function sendResponseData(response) {
            return response.data;
        }
        function sendGetBooksError(response) {
            return $q.reject('Error retrieving books(s). (HTTP status: ' + response.status + ')');
        }

/* getAllBooks Region */
        function getAllBooks() {
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

/* getBookByID Region */
        function getBookByID(bookID) {
            return $http.get('api/books/' + bookID)
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }

/* Update Book Region */
        function updateBookSuccess(response) {
            return 'Book update: ' + response.config.data.title;
        }
        function updateBookError(response) {
            return $q.reject('Error updating book. (HTTP status:' + response.status + ')');
        }
        function updateBook(book) {
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError);
        }
/* Delete Book Region */
        function deleteBookSuccess(response) {
            return 'Book deleted: ' + response.status;
        }
        function deleteBookError(response) {
            return $q.reject('Error deleting book. (HTTP status: ' + response.status + ')');
        }
        function deleteBook(bookID) {
            return $http({
                method: 'DELETE',
                url: 'api/books/' + bookID
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }
/* Add Book Region */
        function addBookSuccess(response) {
            return 'Book added: ' + response.config.data.title;
        }
        function addBookError(response) {
            return $q.reject('Error adding book. (HTTP status: ' + response.status + ')');
        }
        function addBook(newBook) {
            return $http.post('api/books', newBook)
                .then(addBookSuccess)
                .catch(addBookError);
        }
/* Get All Readers Region */
        function getAllReaders() {
            logger.output('getting all readers');
            var deferred = $q.defer();
            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];
            $timeout(function() {
                deferred.resolve(readersArray);
            },1500);
            return deferred.promise;
        }

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };
    }

    dataService.$inject = ['$q', '$timeout', 'logger', '$http', 'constants'];
}());
