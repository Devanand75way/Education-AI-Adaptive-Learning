export const courseRouterDoc = {
     '/courses/': {
         get: {
             summary: 'Fetch all courses',
             description: 'Retrieves a list of all available courses in the system.',
             tags: ['Courses'],
             responses: {
                 200: {
                     description: 'Successfully retrieved the list of courses.',
                     content: {
                         'application/json': {
                             schema: {
                                 type: 'array',
                                 items: {
                                     type: 'object',
                                     properties: {
                                         id: { type: 'string' },
                                         name: { type: 'string' },
                                         description: { type: 'string' },
                                         createdAt: { type: 'string', format: 'date-time' },
                                     },
                                 },
                             },
                         },
                     },
                 },
                 400: {
                     description: 'Invalid request.',
                 },
             },
         },
         post: {
             summary: 'Create a new course',
             description: 'Creates a new course in the system.',
             tags: ['Courses'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 name: { type: 'string', example: 'JavaScript Basics' },
                                 instructor: { type: 'string', example: 'instructor Name' },
                             },
                             required: ['name', 'description'],
                         },
                     },
                 },
             },
             responses: {
                 201: {
                     description: 'Course created successfully.',
                 },
                 400: {
                     description: 'Invalid input.',
                 },
             },
         },
     },
 };
 
 export default courseRouterDoc;