import {Request, Response} from 'express';
import _ = require('lodash');

import * as SurveyResponse from '../models/SurveyResponseModel';
import models = require('../models/ISurveyResponse');
import utils = require('../models/utils');

export function getSurveyResponses(req: Request, res: Response) {
    SurveyResponse.find({ surveyId: req.params.surveyId }, (err, result) => {
        var grouped = utils.CreateResponseStructure(result);
        res.status(200).send(grouped);
    });
}

export function getSurveyResponsesWithQuestionFilter(req: Request, res: Response) {
    var start = new Date().getTime();
    SurveyResponse.find({
        surveyId: req.params.surveyId
    }, (err, result) => {
        var end = new Date().getTime();
    console.warn("Database tok " + (end - start) + " ms");
        var arr = MapToSurveyResponse(result);
        var filtered = utils.FilterSurveyResponses(arr, +req.params.filterQuestionId, +req.params.filterAnswer);
        var grouped = utils.CreateResponseStructure(filtered);
        res.json({ questions: grouped });        
    });
}

export function getQuestionResponseWithQuestionFilter(req: Request, res: Response) {
    var start = new Date().getTime();
    SurveyResponse.find({
        surveyId: req.params.surveyId
    }, (err, result) => {
        var end = new Date().getTime();
    console.warn("Database tok " + (end - start) + " ms");
        var arr = MapToSurveyResponse(result);
        var filtered = utils.FilterSurveyResponses(arr, +req.params.filterQuestionId, +req.params.filterAnswer);
        var question = utils.PickOneQuestion(filtered, +req.params.questionId);
        res.json({question: question});
    })
}

function MapToSurveyResponse(result: any): models.ISurveyResponse[] {
    var arr: models.ISurveyResponse[] = [];
    var start = new Date().getTime();
    for (var index = 0; index < result.length; index++) {
        var element = result[index];
        var surveyRespImpl = new models.SurveyResponseImpl(
            element.surveyId, element.responseId, element.questionId,
            element.questionText, element.answerId, element.answerText
        );
        arr.push(surveyRespImpl);
    }
    var end = new Date().getTime();
    console.warn("MapToSurveyResponse tok " + (end - start) + " ms");
    return arr;
}


export function hello(req: Request, res: Response) {
    res.status(200).send("Hello from reports");
}

export function seed(req: Request, res: Response) {

    var qs: { [key: string]: string[] } = {
        "Hvilket kjønn er du?": ["Mann", "Kvinne"],
        "Liker du is?": ["Ja", "Nei"],
        "Hvor gammel er du?": ["18-24", "25-35", "35-50", "Over 50"],
    };


    var responses = [];

    for (var index = 0; index < 10000; index++) {
        let qIndex = 0;
        for (var key in qs) {
            var answers = qs[key];
            let answer = Math.floor(Math.random() * answers.length);
            var sr = new SurveyResponse({
                surveyId: 1,
                responseId: index,
                questionId: qIndex,
                questionText: key,
                answerId: answer,
                answerText: answers[answer],
            });
            responses.push(sr);
            qIndex++;
        }
    }

    SurveyResponse.remove({}, err => {
        SurveyResponse.insertMany(responses, (err, saved) => {
            res.status(200).send("Seeded");
        });
    });
};

