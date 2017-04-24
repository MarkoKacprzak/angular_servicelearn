(function() {
    "use strict";

    function EditBookController($routeParams, $cookies, $cookieStore, dataService, $log, $location, BooksResource, currentUser) {
    //dataService) {
        var vm = this;
       // dataService.getAllBooks()
       //     .then(function (books) {
       /*    
        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookID;
        })[0]; */
        /*
        function getBookSuccess(book) {
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }
        function getBookError(reason) {
            $log.error(reason);
        }
        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);
        */
        function saveLastEdited(book) {
            //$cookieStore.put('lastEdited', book);
            currentUser.lastBookEdited = book;
        }
        /* resource service */
        vm.currentBook = BooksResource.get({'book_id': $routeParams.bookID});
        vm.currentBook.$promise
            .then(saveLastEdited);
        $log.log(vm.currentBook.toJSON());
    //    debugger;
        $log.log(vm.currentBook);
        /*
        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }
        function updateBookError(errorMessage){
            $log.error(errorMessage);
        }
        */
        vm.saveBook = function () {
            /*
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError);
            */
            vm.currentBook.$update();
            dataService.deleteCache();
            $location.path('/');
        };

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };

       //     });
    }
     angular.module('app')
        .controller('EditBookController', ['$routeParams', //dataService,
                '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'BooksResource', 'currentUser', EditBookController]);
}());