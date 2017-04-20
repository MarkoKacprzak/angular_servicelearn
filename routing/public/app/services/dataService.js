(function () {
    "use strict";
    angular.module('app')
        .factory('dataService', dataService);
    function dataService($q, $timeout, logger, $http, constants) {
        function sendResponseData(response) {
            return response.data;
        }
        function sendGetBooksError(response) {
            return $q.reject('Error retrieving books(s). (HTTP status: ' + response.status + ')');
        }
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
/*     
        function getAllBooks() {
            logger.output('getting all books');
            var bookArray = [
                {
                    book_id: 1,
                    title: 'Harry Potter and the Deathly Hallows',
                    author: 'J.K. Rowling',
                    yearPublished: 2000
                },
                {
                    book_id: 2,
                    title: 'The Cat in the Hat',
                    author: 'Dr. Seuss',
                    yearPublished: 1957
                },
                {
                    book_id: 3,
                    title: 'Encyclopedia Brown, Boy Detective',
                    author: 'Donald J. Sobol',
                    yearPublished: 1963
                }
            ];

            var deferred = $q.defer();
            $timeout(function() {
                deferred.notify('Preparing books to return!');
            },500);

            $timeout(function() {
                var successful = true;//Math.random() < 0.5 ? true : false;
                if (successful){
                    deferred.resolve(bookArray);
                }
                else {
                    deferred.reject('Error retrieving books.');
                }
            },1000);            
            return deferred.promise;
        };
*/
        function getBookByID(bookID) {
            return $http({
                method: 'GET',
                url: 'api/books/' + bookID
            })
                .then(sendResponseData)
                .catch(sendGetBooksError);
        }
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
            updateBook: updateBook
        };
    }

    dataService.$inject = ['$q', '$timeout', 'logger', '$http', 'constants'];
}());
