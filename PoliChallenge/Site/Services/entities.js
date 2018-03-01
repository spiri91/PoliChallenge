﻿var entities = (function () {
    var fillAll = (repo, storage) => {
        var promises = [
            repo.getAll(entities.places).then((result) => storage.set(storage.names.places, result)),
            repo.getAll(entities.questions).then((result) => storage.set(storage.names.questions, result)),
            repo.getAll(entities.hiScores).then((result) => storage.set(storage.names.scores, result)),
        ]

        return Promise.all(promises);
    }

    return {
        fillAll: fillAll
    }
})()