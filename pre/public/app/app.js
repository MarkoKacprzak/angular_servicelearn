(function () {
    "use strict";   
    var app = angular.module('app', []);
    app.provider('books', function (constants) {
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
    });

    app.config(function (booksProvider, constants, badgeServiceProvider) {
        booksProvider.setIncludeVersionInTitle(true);
        console.log('title from constants services ' + constants.APP_TITLE);
        console.log(badgeServiceProvider.$get().retrieveBadge(0));
    });
}());
