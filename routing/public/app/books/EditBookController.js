module.exports = function (app) {
    "use strict";
    function EditBookController($routeParams, dataService) {
        var vm = this;
        dataService.getAllBooks()
            .then(function (books) {
                vm.currentBook = books.filter(function (item) {
                    return item.book_id == $routeParams.bookID;
                })[0];
            });
    }
    app.controller('EditBookController', ['$routeParams','dataService', EditBookController]);
};