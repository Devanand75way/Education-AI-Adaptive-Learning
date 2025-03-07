export const courseEnrollmentRouterDoc = {
     '/course-enrollment/enroll': {
         post: {
             summary: 'Enroll a user in a course',
             description: 'Enrolls a user in a specific course.',
             tags: ['Course Enrollment'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 userId: { type: 'string' },
                                 courseId: { type: 'string' },
                             },
                         },
                     },
                 },
             },
             responses: {
                 201: {
                     description: 'User successfully enrolled.',
                 },
                 400: {
                     description: 'Invalid input.',
                 },
             },
         },
     },
     '/course-enrollment/{userId}': {
         get: {
             summary: 'Fetch enrolled courses for a user',
             description: 'Retrieves all courses a user is enrolled in.',
             tags: ['Course Enrollment'],
             parameters: [
                 {
                     in: 'path',
                     name: 'userId',
                     required: true,
                     description: 'User ID',
                     schema: {
                         type: 'string',
                     },
                 },
             ],
             responses: {
                 200: {
                     description: 'List of enrolled courses.',
                 },
                 404: {
                     description: 'User not found.',
                 },
             },
         },
     },
 };
 
 export default courseEnrollmentRouterDoc;
 