var entities = (function () {
    var fillAll = (repo, storage) => {
        return Promise.all([
            repo.getAll(repo.entities.places).then((result) => storage.set(storage.names.places, result)),
            repo.getAll(repo.entities.questions).then((result) => storage.set(storage.names.questions, result)),
            repo.getAll(repo.entities.hiScores).then((result) => storage.set(storage.names.scores, result)),
        ]);
    }

    return {
        fillAll: fillAll
    }
})()