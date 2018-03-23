var geo = (function () {
    function getCoords(successFunction, errorFunction) {
        return new Promise((successFunction, errorFunction) => navigator.geolocation.getCurrentPosition(successFunction, errorFunction));
    }

    function watchPosition(successFunction) {
        navigator.geolocation.watchPosition(successFunction);
    }

    return {
        get: getCoords,
        watchPosition: watchPosition
    }
})();