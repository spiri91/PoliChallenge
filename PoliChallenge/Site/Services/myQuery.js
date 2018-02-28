﻿var _ = (function () {
    function valueOf(element) {
        checkElement(element);

        return element.val();
    }

    function setValueOf(element, value) {
        checkElement(element);

        element.val(value);
    }

    function checkElement(element) {
        if (!element)
            throw new Error("Invalid element");

        if (element.length == 0)
            throw new Error("Element not found");
    }

    function success(message) {
        message = message || "Created";

        $.notify(message, "success");
    }

    function error(message) {
        message = message || "Error :( ";

        $.notify(message, "error");
    }

    function findInArray(array, value) {
        for (let i in array)
            for (let j in array[i])
                if (array[i][j] == value)
                    return array[i];
    }

    return {
        valueOf: valueOf,
        setValueOf: setValueOf,
        success: success,
        error: error,
        findInArray: findInArray
    }
})();