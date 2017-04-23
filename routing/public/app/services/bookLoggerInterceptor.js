(function () {
    "use stricts";
    var logger={};
    var q={};
    function requestInterceptor(config){
        logger.debug('HTTP ' + config.method + ' request - ' + config.url);
        return config;
    }
    function responseErrorInterceptor(response){
        logger.error('HTTP ' + response.config.method + ' request - ' + response.config.url);
        return q.reject(response);
    }
    function bookLoggerInterceptor($q, $log){
        logger=$log;
        q=$q;
        return {
            request: requestInterceptor,
            //requestError, not implemented interceptors
            //response,
            responseError: responseErrorInterceptor
        }
    }
    angular.module('app')
        .factory('bookLoggerInterceptor', ['$q', '$log', bookLoggerInterceptor]);
}());