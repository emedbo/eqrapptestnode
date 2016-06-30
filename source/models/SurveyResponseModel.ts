import mongoose = require('mongoose');
import models = require('./ISurveyResponse');

interface ISurveyResponseModel extends models.ISurveyResponse, mongoose.Document{
    
}

var surveyResponseSchema = new mongoose.Schema({
    surveyId: Number,
    responseId: Number,
    questionId: Number,
    questionText: String,
    answerId: Number,
    answerText: String
});

var SurveyResponse = mongoose.model<ISurveyResponseModel>("SurveyResponse", surveyResponseSchema);

export = SurveyResponse;