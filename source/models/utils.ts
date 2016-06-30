import models = require('./ISurveyResponse');
import _ = require('lodash');


export function FilterSurveyResponses(responses: models.ISurveyResponse[], questionId: number, answerId: number): models.ISurveyResponse[]{    
    var returnArray: models.ISurveyResponse[] = [];    
    var start = new Date().getTime();
    // group by responseId
    var groups = _.groupBy(responses, 'responseId');
    for(var key in groups){
        var responses = groups[key];
        if(_.some(responses, {'questionId': questionId, 'answerId': answerId})){
            for (var index = 0; index < responses.length; index++) {
                var element = responses[index];
                returnArray.push(element);
            }
        }
    }
    console.log("Found " + returnArray.length + " responses");
    var end = new Date().getTime();
    console.warn("FilterSurveyResponses tok " + (end - start) + " ms");
    return returnArray;
}

export function PickOneQuestion(responses: models.ISurveyResponse[], questionId: number): models.Question{
    var filtered = _.filter(responses, {'questionId': questionId});
    return CreateResponseStructure(filtered)[0];
};

export function CreateResponseStructure(responses: models.ISurveyResponse[]):models.Question[]{
    var groups = _.groupBy(responses, 'questionId');
    var start = new Date().getTime();
    var returnList: models.Question[] = [];
    
    for (var key in groups) {
        if (groups.hasOwnProperty(key)) {
            var element = groups[key];
            if(element != null && element.length > 0){
                let question = new models.Question(element[0].questionId,element[0].questionText);
                
                var answerGroups = _.groupBy(element, 'answerId');
                var numAnswers = element.length;
                for (var answerKey in answerGroups) {
                    if (answerGroups.hasOwnProperty(answerKey)) {
                        var answers = answerGroups[answerKey];
                        if(answers != null && answers.length > 0){
                            
                            var answer = answers[0];
                            question.answers.push(new models.Answer(answer.answerId, answer.answerText, answers.length, answers.length / numAnswers));

                        }
                    }
                }                
                returnList.push(question);                
            }
        }
    }
    var end = new Date().getTime();
    console.warn("CreateResponseStructure tok " + (end - start) + " ms");
    return returnList;
}
