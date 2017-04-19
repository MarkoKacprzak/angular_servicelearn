(function() {
    "use strict";

    function EditBookController($routeParams, books) {
    //dataService) {
        var vm = this;
       // dataService.getAllBooks()
       //     .then(function (books) {
        vm.currentBook = books.filter(function (item) {
            return item.book_id == $routeParams.bookID;
        })[0];
       //     });
    }
     angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', //dataService,
                EditBookController]);
}());