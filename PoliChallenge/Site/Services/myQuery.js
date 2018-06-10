var _ = (function () {
    var props = {
        disabled: 'disabled'
    }

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

        if (element.length === 0)
            throw new Error("Element not found");
    }

    function success(message) {
        message = message || "Created";

        $.notify(message, "success");
    }

    function setSelectedIndexOfSelectElement(element, index) {
        element.attr('selectedIndex', index);
    }

    function warning(message) {
        $.notify(message, "warning");
    }

    function error(message) {
        if (message.status == 0) {
            $.notify('No internet :(', 'error');
            return;
        }

        if (message.status < 300) {
            $.notify(message.statusText, 'success');
            return true;
        }

        if (message.statusText)
            message = message.statusText;
        else
            message = message || "Error :( ";

        $.notify(message, "error");
    }

    function findInArray(array, value) {
        for (let i in array)
            for (let j in array[i])
                if (array[i][j] === value)
                    return array[i];

        return null;
    }

    function disableElements(elementsArray) {
        for (let i in elementsArray)
            elementsArray[i].prop(props.disabled, true);
    }

    function enableElements(elementsArray) {
        for (let i in elementsArray)
            elementsArray[i].prop(props.disabled, false);
    }

   
    function showSpinner() {
        return new Promise((resolve) => {
            let element = $('body').addClass("loading");
            resolve(element);
        });
    }

    function hideSpinner() {
        return new Promise((resolve) => {
            let element = $('body').removeClass("loading");
            resolve(element);
        });
    }

    function confirm(contentString,  okFunction) {
        $.confirm({
            title: 'Confirm!',
            content: contentString,
            buttons: {
                confirm: () => okFunction(),
                cancel: () => { }
            }
        });
    }

    function hideElement(jqueryElement) {
        jqueryElement.css('display', 'none');
    }

    function showElement(jqueryElement) {
        jqueryElement.css('display', 'block');
    }

    function setTextOf(element, text) {
        element.text(text);
    }

    function setOpacityOfElement(jqueryElement, opacityLevel) {
        jqueryElement.css('opacity', opacityLevel);
    }

    return {
        valueOf: valueOf,
        setValueOf: setValueOf,
        success: success,
        error: error,
        warning: warning,
        findInArray: findInArray,
        disableElements: disableElements,
        enableElements: enableElements,
        showSpinner: showSpinner,
        hideSpinner: hideSpinner,
        confirm: confirm,
        setSelectedIndexOfSelectElement: setSelectedIndexOfSelectElement,
        setTextOf: setTextOf,
        hideElement: hideElement,
        showElement: showElement,
        setOpacityOfElement: setOpacityOfElement
    }
})()