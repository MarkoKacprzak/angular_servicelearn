(function() {
    "use strict";

    function EditBookController($routeParams, $cookies, $cookieStore, dataService, $log, $location) {
    //dataService) {
        var vm = this;
       // dataService.getAllBooks()
       //     .then(function (books) {
       /*    
        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookID;
        })[0]; */
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

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }
        function updateBookError(errorMessage){
            $log.error(errorMessage);
        }
        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError);
        };

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };

       //     });
    }
     angular.module('app')
        .controller('EditBookController', ['$routeParams', //dataService,
                '$cookies', '$cookieStore', 'dataService', '$log', '$location', EditBookController]);
}());