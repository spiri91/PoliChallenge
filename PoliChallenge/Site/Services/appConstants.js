var constants = (function () {
    return {
        game: {
            ENTRY_POINT: {
                name: 'Starting Point',
                observations: 'Entry point to Politehnica Park from Iuliu Maniu',
                latitude: 44.434543,
                longitude: 26.048769
            },
            END_GAME_MESSAGE: 'You just finished the game. :) Start over?',
            ALLOWED_WRONG_ANSWERED_QUESTIONS: 2,
            ANSWERED_QUESTION_POINTS: 10,
            DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS: 15,
            CORRECT_ANSWER_MESSAGE: 'Correct !!',
            WRONG_ANSWER_MESSAGE: 'Wrong :(',
            TEAM_NAME_LENGTH_MESSAGE: 'Team name must be \n at least 4 characters long',
            LOCATION_DISABLED_MESSAGE: 'Please enable location \n service and reload \n the application!'
        },
        questions: {
            QUESTIONS_SELECT_PLACE: 'Select a place to edit a question of it',
            QUESTIONS_SELECT_QUESTION_FOR_EDIT: 'Select the question you want to edit',
            DELETE_QUESTION: 'Delete this question?'
        },
        places: {
            SELECT_PLACE: 'Select a place for edit or delete'
        },
        hiScores: {
            DATE_FORMAT: 'DD/MM/YYYY hh:mm'
        },
        messages: {
            MISSING_TOKEN: 'Token is missing :(',
            DELETED_ITEM: 'Item deleted.',
            CREATED_ITEM: 'Item created.',
            UPDATED_ITEM: 'Item updated.'
        },
    }
})()