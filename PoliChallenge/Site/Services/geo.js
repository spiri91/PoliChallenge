var geo = (function () {
    function getCoords(successFunction, errorFunction) {
        return new Promise((successFunction, errorFunction) => navigator.geolocation.getCurrentPosition(successFunction, errorFunction));
    }

    function watchPosition(successFunction, onErrorFunction) {
        navigator.geolocation.watchPosition(successFunction, onErrorFunction);
    }

    return {
        get: getCoords,
        watchPosition: watchPosition
    }
})();