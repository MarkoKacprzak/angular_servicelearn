(function() {
    "use strict";
    angular.module('app')
        .controller('BooksController', ['$q','books', 'dataService', 'logger', 'badgeService', '$cookies', '$cookieStore', '$log', '$route', 'BooksResource', BooksController]);

    function BooksController($q, books, dataService, logger, badgeService, $cookies, $cookieStore, $log, $route, BooksResource) {
        var vm = this;
        vm.appName = books.appName;

        function getUserSummarySuccess(summaryData){
            console.log(summaryData);
            vm.summaryData = summaryData;
        }
        dataService.getUserSummary()
            .then(getUserSummarySuccess);
        /*
        var booksPromise = dataService.getAllBooks();
        var readerssPromise = dataService.getAllReaders();
        
        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }
        function getAllDataError(reason){
            console.log(reason);
        }
        $q.all([booksPromise, readerssPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);
            */
        //vm.allBooks = dataService.getAllBooks();
        function errorCallback(message) {
            console.log('Some Error: ' + message);
        }

        function getBooksSuccess(books) {
            vm.allBooks = books;
            vm.allBooks.forEach(function (element) {
                logger.logBook(element);
            });
        }
        function getBooksError(message) {
            console.log(message);
            throw 'error in getBooksError';
        } 
        function getBooksNotify(notifyMessafe) {
           console.log(notifyMessafe);
        }
        function getAllBookComplete(){
            console.log('Just finished loading books');
        }
        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError, getBooksNotify)
            .catch(errorCallback)
            .finally(getAllBookComplete);
            
       // vm.allBooks = BooksResource.query();
        function getReadersSuccess(readers) {
            vm.allReaders = readers;
        }
        function getAllReadersComplete(){
            console.log('Just finished loading readers');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function deleteBooksSuccess(message) {
            $log.info(message);
            $route.reload();
        }
        function deleteBooksError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.deleteBook = function (bookID) {
            dataService.deleteBook(bookID)
                .then(deleteBooksSuccess)
                .catch(deleteBooksError);
        };

        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');

        $log.log('logging with log');
        $log.info('logging with info');
        $log.warn('logging with warn');
        $log.error('logging with error');
        $log.debug('logging with debug');


        logger.output('BooksController has been created.');
    }

}());