(function () {
    "use strict";   
    var app = angular.module('app', []);
    app.provider('books', function () {
        this.$get = function () {
            var appName = 'Book Logger';
            var appDesc = 'Track which books you read.';
            return {
                appName: appName,
                appDesc: appDesc
            };
        };
    });
}());
