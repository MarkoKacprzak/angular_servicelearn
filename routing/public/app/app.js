(function () {
    "use strict";   
    var angular = require('angular');
    var ngRoute = require('angular-route');
    var app = angular.module('app',  [ngRoute]);
    require('./services')(app);
    require('./books')(app);
   
    app.provider('books', ['constants', function (constants) {
        this.$get = function () {
            var appName = constants.APP_TITLE;
            var appDesc = constants.APP_DESCRIPTION;
            
            var version = constants.APP_VERSION;
            if (includeVersionInTitle){
                appName += ' ' + version;
            }

            return {
                appName: appName,
                appDesc: appDesc
            };
        };
        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };
    }]);

    app.config(['$routeProvider','booksProvider', 'constants', 'badgeServiceProvider','$locationProvider', function ($routeProvider, booksProvider, constants, badgeServiceProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        booksProvider.setIncludeVersionInTitle(true);
        console.log('title from constants services ' + constants.APP_TITLE);
        console.log(badgeServiceProvider.$get().retrieveBadge(0));
        $routeProvider
            .when('/', {
                template: require('./templates/books.html'),
                controller: 'BooksController',
                controllerAs: 'books'
            })
            .when('/AddBook', {
                template: require('./templates/addBook.html'),
                controller: 'AddBookController',
                controllerAs: 'addBook'
            })
            .when('/EditBook/:bookID', {
                template: require('./templates/editBook.html'),
                controller: 'EditBookController',
                controllerAs: 'bookEditor'
            })
            .otherwise('/');
    }]);
}());
