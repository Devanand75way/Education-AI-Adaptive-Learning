export const quizAttemptRouterDoc = {
     '/quiz-attempt/': {
         post: {
             summary: 'Create a Quiz Attempt',
             description: 'Records a new quiz attempt by a user.',
             tags: ['Quiz Attempt'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 userId: { type: 'string', description: 'ID of the user attempting the quiz', example: 'user123-xyz789' },
                                 quizId: { type: 'string', description: 'ID of the quiz being attempted', example: 'quiz456-abc321' },
                             },
                             required: ['userId', 'quizId', 'score', 'timeSpent', 'completed'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'Quiz attempt recorded successfully.' },
                 400: { description: 'Invalid input data.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
     '/quiz-attempt/{userId}': {
         get: {
             summary: 'Get Quiz Attempts by User',
             description: 'Fetches all quiz attempts made by a specific user.',
             tags: ['Quiz Attempt'],
             parameters: [
                 {
                     in: 'path',
                     name: 'userId',
                     required: true,
                     description: 'ID of the user to retrieve quiz attempts for',
                     schema: { type: 'string' },
                     example: 'user123-xyz789',
                 },
             ],
             responses: {
                 200: { description: 'List of quiz attempts fetched successfully.' },
                 400: { description: 'Invalid user ID provided.' },
                 404: { description: 'No quiz attempts found for the given user.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default quizAttemptRouterDoc;
 