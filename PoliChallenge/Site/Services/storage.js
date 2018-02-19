var storage = (function () {
    var set = (name, object) => {
        let obj = JSON.stringify(object);
        localStorage.setItem(name, obj);
    }

    var get = (name) => {
        let obj = localStorage.getItem(name);

        return JSON.parse(obj);
    }

    return {
        set: set,
        get: get,
        names: {
            scores: 'scores',
            places: 'places',
            questions: 'questions'
        }
    }
})()