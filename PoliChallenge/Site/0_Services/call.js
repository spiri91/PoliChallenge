var call = (function ($) {
    function makeCall({ to, action = 'GET', body = null, token = '' }) {
        return $.ajax({
            url: to,
            headers: { 'Authorization': token },
            method: action,
            dataType: 'json',
            data: body,
        });
    }

    return {
        actions: {
            get: 'GET',
            post: 'POST',
            delete: 'DELETE',
            put: 'PUT'
        },

        ajax: makeCall
    }
})(JQuery);