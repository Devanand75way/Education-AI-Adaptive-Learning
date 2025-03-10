export interface IFeedbackReport {
     quizAttemptId : string;
     quizId: string;
     timeSpent:number;
     attempts:number
     difficultyNumeric:number
     accuracy:number;
     avgTimeSpent: number;
     questionId:number;
     topic: string
}