(function() {
    "use strict";
    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', BooksController]);

    function BooksController(books, dataService, logger, badgeService) {
        var vm = this;
        vm.appName = books.appName;
        //vm.allBooks = dataService.getAllBooks();
        function getBooksSuccess(books){
            vm.allBooks = books;
            vm.allBooks.forEach(function (element) {
                logger.logBook(element);
            });
        }
        function getBooksError(message){
            console.log(message);
        }
        function getBooksNotify(notifyMessafe){
             console.log(notifyMessafe);
        }
        dataService.getAllBooks()
            .then(getBooksSuccess, getBooksError, getBooksNotify);

        vm.allReaders = dataService.getAllReaders();
        vm.getBadge = badgeService.retrieveBadge;
        logger.output('BooksController has been created.')
      
    }

}());