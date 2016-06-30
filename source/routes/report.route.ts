import express = require('express');

import reportController = require('../controllers/report.controller');

let router = express.Router();

// test routes
router.route('').get(reportController.hello);
router.route('/seed').get(reportController.seed);

// serious routes
router.route('/:surveyId').get(reportController.getSurveyResponses);
router.route('/:surveyId/:filterQuestionId/:filterAnswer').get(reportController.getSurveyResponsesWithQuestionFilter);
router.route('/:surveyId/:questionId/:filterQuestionId/:filterAnswer').get(reportController.getQuestionResponseWithQuestionFilter);

export = router;
