/// <reference path="../../output/myscripts/app.js" />
'use strict';

(function (repo, guidGenerator, _, storage, entities, constants) {
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
        if (selectedId.length === 0)
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
        if (selectedId.length === 0)
            return;

        let fullElement = _.findInArray(places, selectedId[0].value);
        selectedPlace = fullElement;

        if (fullElement) {
            populateListOfQuestions(fullElement);
            enableSelectOfQuestions();
            enableSubmitButton();
            disableButtonsForDeleteAndUpdate();
        }
        else
            resetAllControls();
    }

    function resetAllControls() {
        disableSelectOfQuestions();
        clearSelectQuestionElement();
        clearFieldProperties();
        disableSubmitButton();
        disableButtonsForDeleteAndUpdate();
    }

    function populateListOfQuestions(element) {
        let allQuestions = storage.get(storage.names.questions);

        let questionsOfElement = allQuestions.filter((x) => x.for === element.key);

        questions = questionsOfElement;

        elements.questions.empty().append('<option value= "" selected>' + constants.questions.QUESTIONS_SELECT_QUESTION_FOR_EDIT + '</option>');

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
        let token = _.valueOf(elements.token);
        if (!token || token == '') {
            _.warning(constants.messages.MISSING_TOKEN);

            return;
        }

        _.confirm(constants.questions.DELETE_QUESTION, () =>
            _.showSpinner()
                .then(() => repo.delete(repo.entities.questions, selectedQuestion.key, token))
                .then(() => _.success(constants.messages.DELETED_ITEM), _.error)
                .then(refresh)
                .then(setAllControlsToEmpty)
                .then(init)
                .then(_.hideSpinner));
    }

    function refresh() {
        return entities.fillAll(repo, storage);
    }

    function setAllControlsToEmpty() {
        _.setSelectedIndexOfSelectElement(elements.places, 0);
        resetAllControls();
    }

    function submit() {
        let token = _.valueOf(elements.token);
        if (!token || token == '') {
            _.warning(constants.messages.MISSING_TOKEN);

            return;
        }

        let key = guidGenerator.generate();
        let belongsTo = selectedPlace.key;
        let properties = getValuesOfAllControls();

        let newQuestion = repo.createQuestion({
            key: key, belongsTo: belongsTo, statement: properties.statement, answer1: properties.answer1,
            answer2: properties.answer2, answer3: properties.answer3, correctAnswer: properties.correctAnswer
        });

        return _.showSpinner()
            .then(() => repo.post(repo.entities.questions, newQuestion, token))
            .then(() => _.success(constants.messages.CREATED_ITEM), _.error)
            .then(refresh)
            .then(setAllControlsToEmpty)
            .then(init)
            .then(_.hideSpinner);
    }

    function update() {
        let token = _.valueOf(elements.token);
        if (!token || token == '') {
            _.warning(constants.messages.MISSING_TOKEN);

            return;
        }

        let key = selectedQuestion.key;
        let belongsTo = selectedPlace.key;
        let properties = getValuesOfAllControls();

        let newQuestion = repo.createQuestion({
            key: key, belongsTo: belongsTo, statement: properties.statement, answer1: properties.answer1,
            answer2: properties.answer2, answer3: properties.answer3, correctAnswer: properties.correctAnswer
        });

        return _.showSpinner()
            .then(() => repo.put(repo.entities.questions, newQuestion, token))
            .then(() => _.success(constants.messages.UPDATED_ITEM), _.error)
            .then(refresh)
            .then(setAllControlsToEmpty)
            .then(init)
            .then(_.hideSpinner);
    }

    function getValuesOfAllControls() {
        return {
            statement: _.valueOf(elements.statement),
            answer1: _.valueOf(elements.answer1),
            answer2: _.valueOf(elements.answer2),
            answer3: _.valueOf(elements.answer3),
            correctAnswer: _.valueOf(elements.correctAnswer)
        };
    }

    function populateListOfPlaces() {
        places = storage.get(storage.names.places);

        elements.places
            .empty()
            .append('<option value="" selected>' + constants.questions.QUESTIONS_SELECT_PLACE + '</option>');

        $.each(places, function () {
            elements.places.append(new Option(this.name, this.key));
        });
    }

    init();
})(repo, guidGenerator, _, storage, entities, constants)