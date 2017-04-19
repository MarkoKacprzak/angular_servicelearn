(function() {
    "use strict";
    angular.module('app')
        .controller('BooksController', ['$q','books', 'dataService', 'logger', 'badgeService', '$cookies', '$cookieStore', BooksController]);

    function BooksController($q, books, dataService, logger, badgeService, $cookies, $cookieStore) {
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
        $q.all([booksPromise, readerssPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);
        //vm.allBooks = dataService.getAllBooks();
        /*
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
        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError, getBooksNotify)
            .catch(errorCallback)
            .finally(getAllBookComplete);
        
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
        */
        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');
        logger.output('BooksController has been created.');
    }

}());