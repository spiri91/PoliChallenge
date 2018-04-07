/// <reference path="../../output/myscripts/app.js" />
'use strict';

(function (repo, geo, guidGenerator, _, storage, entities, constants) {
    let places = [];
    let selectedElement = null;
    let eventsAddedToBtns = false;

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
        disableButtonsForDeleteAndUpdate();
    }

    function populateListOfPlaces() {
        places = storage.get(storage.names.places);

        elements.placesList
            .empty()
            .append('<option value="" selected>' + constants.places.SELECT_PLACE + '</option>');

        $.each(places, function () {
            elements.placesList.append(new Option(this.name, this.key));
        });
    }

    function addEventsToBtns() {
        if (eventsAddedToBtns)
            return;

        elements.autoFillBtn.click(getCoords);
        elements.submitBtn.click(submit);
        elements.deleteBtn.click(deleteFunction);
        elements.updateBtn.click(update);
        elements.placesList.change(changeSelectedPlace);

        eventsAddedToBtns = true;
    }

    function changeSelectedPlace() {
        let selectedId = elements.placesList.find(':selected');
        if (selectedId.length === 0)
            return;

        let fullElement = _.findInArray(places, selectedId[0].value);
        selectedElement = fullElement;

        if (selectedElement) {
            fillElementsWithValues();
            enableButtonsForDeleteAndUpdate();
            disableSubmitButton();
        }
        else {
            clearElementsOfValues();
            disableButtonsForDeleteAndUpdate();
            enableSubmitButton();
        }
    }

    function disableButtonsForDeleteAndUpdate() {
        _.disableElements([elements.updateBtn, elements.deleteBtn]);
    }

    function enableSubmitButton() {
        _.enableElements([elements.submitBtn]);
    }

    function fillElementsWithValues() {
        _.setValueOf(elements.name, selectedElement.name);
        _.setValueOf(elements.observations, selectedElement.observations);
        _.setValueOf(elements.latitude, selectedElement.latitude);
        _.setValueOf(elements.longitude, selectedElement.longitude);
    }

    function disableSubmitButton() {
        _.disableElements([elements.submitBtn]);
    }

    function clearElementsOfValues() {
        let elementsToClear = [elements.latitude, elements.longitude, elements.name, elements.observations];
        for (let i in elementsToClear)
            _.setValueOf(elementsToClear[i], '');
    }

    function enableButtonsForDeleteAndUpdate() {
        _.enableElements([elements.deleteBtn, elements.updateBtn]);
    }

    function update() {
        let token = _.valueOf(elements.token);
        if (!token || token == '') {
            _.warning(constants.messages.MISSING_TOKEN);

            return;
        }

        selectedElement.name = _.valueOf(elements.name);
        selectedElement.observations = _.valueOf(elements.observations);
        selectedElement.latitude = _.valueOf(elements.latitude);
        selectedElement.longitude = _.valueOf(elements.longitude);

        return _.showSpinner()
            .then(() => repo.put(repo.entities.places, selectedElement, token))
            .then(() => _.success(constants.messages.UPDATED_ITEM), _.error)
            .then(refresh)
            .then(init)
            .then(_.hideSpinner);
    }

    function deleteFunction() {
        let token = _.valueOf(elements.token);
        if (!token || token == '') {
            _.warning(constants.messages.MISSING_TOKEN);
            return;
        }

        _.confirm(constants.places.DELETE_PLACE, () => _.showSpinner()
            .then(() => repo.delete(repo.entities.places, selectedElement.key, token))
            .then(() => _.success(constants.messages.DELETED_ITEM), _.error)
            .then(refresh)
            .then(init)
            .then(_.hideSpinner));
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

        return _.showSpinner()
            .then(() => repo.post(repo.entities.places, newPlace, token))
            .then(() => _.success(constants.messages.CREATED_ITEM), _.error)
            .then(refresh)
            .then(init)
            .then(_.hideSpinner);
    }

    function refresh() {
        return entities.fillAll(repo, storage);
    }

    init();
})(repo, geo, guidGenerator, _, storage, entities, constants)