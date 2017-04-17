(function () {
    "use strict";
    angular.module('app')
        .factory('dataService', dataService);
    function dataService($q, $timeout, logger) {
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
                var successful = true;
                if (successful){
                    deferred.resolve(bookArray);
                }
                else {
                    deferred.reject('Error retrieving books.');
                }
            },1000);            
            return deferred.promise;
        };

        function getAllReaders() {
            logger.output('getting all readers');            
            return [
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
        }

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
    }

    dataService.$inject = ['$q', '$timeout', 'logger'];
}());
