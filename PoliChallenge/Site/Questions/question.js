/// <reference path="../../output/myscripts/app.js" />
"use strict";

(function (repo, guidGenerator, _, storage, entities) {
    'use strict';

    let places = [];
    let questions = [];

    let eventsAddedToElements = false;

    let elements = {
        places: $('#listOfPlaces'),
        questions: $('#listOfQuestions'),
        delete: $('#delete'),
        token: $('#token'),
        statement: $('#statement'),
        answer1: $('#answer1'),
        answer2: $('#answer2'),
        answer3: $('#answer3'),
        correctAnswer: $('#correctAnswer'),
        submit: $('#submit'),
        update: $('update')
    }

    function init() {
        addEventsToElements();
        populateListOfPlaces();

        disableButtonsForDeleteAndUpdate();
        disableSelectOfQuestions();
    }

    function disableButtonsForDeleteAndUpdate() {
        _.disableElements([elements.delete, elements.update]);
    }

    function addEventsToElements() {
        if (eventsAddedToElements)
            return;

        elements.delete.click(deleteFunction);
        elements.submit.click(submit);
        elements.update.click(update);
        elements.places.change(changedSelectedPlace);

        eventsAddedToElements = true;
    }

    function changedSelectedPlace() {
        let selectedId = elements.places.find(':selected');
        if (selectedId.length == 0)
            return;

        let fullElement = _.findInArray(places, selectedId[0].value)
       
        if (fullElement) {
            populateListOfQuestions(fullElement);
            enableSelectOfQuestions();
        }
        else {
            disableSelectOfQuestions();
            clearSelectQuestionElement();
        }
    }

    function populateListOfQuestions(element) {
        let questions = storage.get(storage.names.questions);

        let questionsOfElement = questions.filter((x) => x.for == element.key);

        elements.questions.empty().append('<option value= "" selected> Select a place to edit a question of it</option>');

        $.each(questionsOfElement,
            function () {
                elements.questions.append(new Option(this.statement, this.key));
            });
    }

    function enableSelectOfQuestions() {
        _.enableElements([elements.questions]);
    }

    function disableSelectOfQuestions() {
        _.disableElements([elements.questions]);
    }

    function clearSelectQuestionElement() {
        elements.questions.empty();
    }

    function deleteFunction() {
    }

    function submit() {
    }

    function update() {
    }

    function populateListOfPlaces() {
        places = storage.get(storage.names.places);

        elements.places
            .empty()
            .append('<option value="" selected>Select a place to edit a question of it</option>')

        $.each(places, function () {
            elements.places.append(new Option(this.name, this.key));
        });
    }

    function disableDeleteAndUpdateButtons() {

    }

    function disableSelectOfQuestions() {

    }

    init();
})(repo, guidGenerator, _, storage, entities);