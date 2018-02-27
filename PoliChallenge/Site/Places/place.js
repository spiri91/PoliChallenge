(function (repo, geo, guidGenerator, _) {
        let elements = {
            name: $("#name"),
            autoFillBtn: $('#btnAutoFill'),
            latitude: $('#latitude'),
            longitude: $('#longitude'),
            observations: $('#observations'),
            token: $('#token'),
            submitBtn: $('#submit')
        }

        function init() {
            addEventsToBtns();
        }

        function addEventsToBtns() {
            elements.autoFillBtn.click(getCoords);
            elements.submitBtn.click(submit);
        }

        function getCoords() {
            geo.get().then((result) => {
                _.setValueOf(elements.latitude, result.coords.latitude);
                _.setValueOf(elements.longitude, result.coords.longitude)
            });
        }

        function submit() {
            let key = guidGenerator.generate();
            let name = _.valueOf(elements.name);
            let latitude = _.valueOf(elements.latitude);
            let longitude = _.valueOf(elements.longitude);
            let observations = _.valueOf(elements.observations);
            let token = _.valueOf(elements.token);

            let newPlace = repo.createPlace({ key: key, name: name, latitude: latitude, longitude: longitude, observations: observations });

            repo.post(repo.entities.places, newPlace, token).then(_.success, _.error)
        }

        init();
    })(repo, geo, guidGenerator, _)