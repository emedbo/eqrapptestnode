export interface ISurveyResponse{
    surveyId: number;
    responseId: number;
    questionId: number;
    questionText: string;
    answerId: number; 
    answerText: string;
};

export class SurveyResponseImpl implements ISurveyResponse{
    constructor(surveyId: number, responseId: number, questionId: number, 
    questionText: string, 
    answwerId: number, answerText: string){
        this.surveyId = surveyId;
        this.responseId = responseId;
        this.questionId = questionId;
        this.questionText = questionText;
        this.answerId = answwerId;
        this.answerText = answerText;    
    }
    surveyId: number;
    responseId: number;
    questionId: number;
    questionText: string;
    answerId: number; 
    answerText: string;
}

export class Question{
    id: number;
    text: string;
    answers: Answer[];
    
    constructor(id: number, text:string){
        this.answers = [];
        this.id = id;
        this.text = text;
    }
}
 export class Answer{
    id: number;
    text: string;
    numAnswers: number;
    percentage: number;
    
    constructor(id: number, text: string, numAnswers: number, percentage: number){
        this.id = id;
        this.text = text;
        this.numAnswers = numAnswers;
        this.percentage = percentage;
    }
}

//export = {ISurveyResponse, SurveyResponseImpl};