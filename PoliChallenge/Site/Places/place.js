(function (repo, geo, guidGenerator, _, storage) {
    let places = [];

    let elements = {
        name: $("#name"),
        autoFillBtn: $('#btnAutoFill'),
        latitude: $('#latitude'),
        longitude: $('#longitude'),
        observations: $('#observations'),
        token: $('#token'),
        submitBtn: $('#submit'),
        deleteBtn: $('#delete'),
        placesList: $('#listOfPlaces'),
        updateBtn: $('#update')
    }

    function init() {
        addEventsToBtns();
        populateListOfPlaces();
    }

    function populateListOfPlaces() {
        places = storage.get(storage.names.places);

        $.each(places, function () {
            elements.placesList.append(new Option(this.name, this.key));
        });
    }

    function addEventsToBtns() {
        elements.autoFillBtn.click(getCoords);
        elements.submitBtn.click(submit);
        elements.deleteBtn.click(deleteFunction);
        elements.updateBtn.click(update);
        elements.placesList.change(changeSelectedPlace);
    }

    function changeSelectedPlace(e) {
        let selectedId = elements.placesList.find(':selected');
        if (selectedId.length == 0)
            return;

        let fullElement = _.findInArray(places, selectedId[0].value)
        debugger;

    }

    function update() {

    }

    function deleteFunction() {
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
})(repo, geo, guidGenerator, _, storage)