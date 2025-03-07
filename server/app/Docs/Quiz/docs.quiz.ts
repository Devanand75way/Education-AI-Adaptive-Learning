export const quizRouterDoc = {
     '/quiz/': {
         post: {
             summary: 'Create a Quiz',
             description: 'Creates a new quiz for a specific course.',
             tags: ['Quiz'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 courseId: { type: 'string', description: 'ID of the course associated with the quiz', example: 'abc123-def456' },
                                 topicName: { type: 'string', description: 'Title of the quiz', example: 'JavaScript Basics' },
                                 difficulty: { type: 'string', description: 'difficulty of the quiz', example: 'Easy | Medium | Advanced'}
                             },
                             required: ['courseId', 'title', 'totalMarks', 'duration'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'Quiz created successfully.' },
                 400: { description: 'Invalid input data.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
     '/quiz/{courseId}': {
         get: {
             summary: 'Get Quizzes by Course',
             description: 'Fetches all quizzes associated with a specific course.',
             tags: ['Quiz'],
             parameters: [
                 {
                     in: 'path',
                     name: 'courseId',
                     required: true,
                     description: 'ID of the course to retrieve quizzes for',
                     schema: { type: 'string' },
                     example: 'abc123-def456',
                 },
             ],
             responses: {
                 200: { description: 'List of quizzes fetched successfully.' },
                 400: { description: 'Invalid course ID provided.' },
                 404: { description: 'No quizzes found for the given course.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default quizRouterDoc;
 