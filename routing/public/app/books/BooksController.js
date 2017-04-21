(function () {
    "use strict";
    angular.module('app')
        .controller('BooksController', ['$q','books', 'dataService', 'logger', 'badgeService', '$cookies', '$cookieStore', '$log', BooksController]);

    function BooksController($q, books, dataService, logger, badgeService, $cookies, $cookieStore, $log) {
        var vm = this;
        vm.appName = books.appName;
        var booksPromise = dataService.getAllBooks();
        var readerssPromise = dataService.getAllReaders();
        
        function getAllDataSuccess(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }
        function getAllDataError(reason){
            console.log(reason);
        }
        /*
        $q.all([booksPromise, readerssPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);
            */
        //vm.allBooks = dataService.getAllBooks();
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
        function errorCallback(message) {
            console.log('Some Error: ' + message);
        }
        function getBooksNotify(notifyMessafe) {
           console.log(notifyMessafe);
        }
        function getAllBookComplete(){
            console.log('Just finished loading books');
        }

        function successResponseData(data, status, headers, config) {
            getBooksSuccess(data);
        }
        function errorResponseData(data, status, headers, config) {
            return $q.reject('Error http status:' + status);
        }
        dataService.getAllBooks()
            .success(successResponseData)
            .error(errorResponseData);

/*
            .then(getBooksSuccess, getBooksError, getBooksNotify)
            .catch(errorCallback)
            .finally(getAllBookComplete);
*/
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