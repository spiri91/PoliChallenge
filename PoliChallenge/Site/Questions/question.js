/// <reference path="../../output/myscripts/app.js" />
"use strict";

(function (repo, guidGenerator, _, storage, entities) {
    'use strict';

    let places = [];
    let questions = [];

    let selectedPlace = null;
    let selectedQuestion = null;

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
        update: $('#update')
    }

    function init() {
        addEventsToElements();
        populateListOfPlaces();

        disableButtonsForDeleteAndUpdate();
        disableSelectOfQuestions();
        disableSubmitButton();
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
        elements.questions.change(changedSelectedQuestion);

        eventsAddedToElements = true;
    }

    function changedSelectedQuestion() {
        let selectedId = elements.questions.find(':selected');
        if (selectedId.length == 0)
            return;

        let fullElement = _.findInArray(questions, selectedId[0].value);

        if (fullElement) {
            selectedQuestion = fullElement;
            enableButtonsForDeleteAndUpdate();
            setFieldProperties(fullElement);
            disableSubmitButton();
        }
        else {
            selectedQuestion = null;
            disableButtonsForDeleteAndUpdate();
            enableSubmitButton();
            clearFieldProperties();
        }
    }

    function clearFieldProperties() {
        _.setValueOf(elements.statement, '');
        _.setValueOf(elements.answer1, '');
        _.setValueOf(elements.answer2, '');
        _.setValueOf(elements.answer3, '');
        _.setValueOf(elements.correctAnswer, '');
    }

    function enableSubmitButton() {
        _.enableElements([elements.submit]);
    }

    function disableSubmitButton() {
        _.disableElements([elements.submit]);
    }

    function enableButtonsForDeleteAndUpdate() {
        _.enableElements([elements.delete, elements.update]);
    }

    function setFieldProperties(element) {
        _.setValueOf(elements.statement, element.statement);
        _.setValueOf(elements.answer1, element.answer1);
        _.setValueOf(elements.answer2, element.answer2);
        _.setValueOf(elements.answer3, element.answer3);
        _.setValueOf(elements.correctAnswer, element.correctAnswer);
    }

    function changedSelectedPlace() {
        let selectedId = elements.places.find(':selected');
        if (selectedId.length == 0)
            return;

        let fullElement = _.findInArray(places, selectedId[0].value)
       
        if (fullElement) {
            populateListOfQuestions(fullElement);
            enableSelectOfQuestions();
            enableSubmitButton();
            disableButtonsForDeleteAndUpdate();
        }
        else {
            disableSelectOfQuestions();
            clearSelectQuestionElement();
            clearFieldProperties();
            disableSubmitButton();
            disableButtonsForDeleteAndUpdate();
        }
    }

    function populateListOfQuestions(element) {
        let allQuestions = storage.get(storage.names.questions);

        let questionsOfElement = allQuestions.filter((x) => x.for == element.key);

        questions = questionsOfElement;

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

    init();
})(repo, guidGenerator, _, storage, entities);