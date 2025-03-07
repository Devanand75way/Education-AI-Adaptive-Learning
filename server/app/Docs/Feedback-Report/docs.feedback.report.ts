export const feedbackReportRouterDoc = {
     '/feedback-report/user-feedback': {
         post: {
             summary: 'Submit Feedback Report',
             description: 'Allows users to submit feedback reports for quiz attempts.',
             tags: ['Feedback Report'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 quizAttemptId: { type: 'string', description: 'ID of the quiz attempt', example: '123e4567-e89b-12d3-a456-426614174000' },
                                 quizId: { type: 'string', description: 'ID of the related quiz', example: '456e7890-a123-b456-c789-123456789abc' },
                                 timeSpent: { type: 'integer', description: 'Total time spent on the quiz in seconds', example: 120 },
                                 attempts: { type: 'integer', description: 'Number of attempts made', example: 2 },
                                 difficultyNumeric: { type: 'integer', description: 'Difficulty level of the quiz (1-10 scale)', example: 5 },
                                 accuracy: { type: 'number', format: 'float', description: 'Accuracy percentage (0-100)', example: 85.5 },
                                 avgTimeSpent: { type: 'number', format: 'float', description: 'Average time spent per question in seconds', example: 10.5 },
                                 questionId: { type: 'integer', description: 'ID of the question in focus', example: 101 },
                             },
                             required: ['quizAttemptId', 'quizId', 'timeSpent', 'attempts', 'difficultyNumeric', 'accuracy', 'avgTimeSpent', 'questionId'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'Feedback report submitted successfully.' },
                 400: { description: 'Invalid input data.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default feedbackReportRouterDoc;
 