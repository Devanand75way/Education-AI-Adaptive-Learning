export const videoRouterDoc = {
     '/video/': {
         post: {
             summary: 'Upload a Video',
             description: 'Uploads a new video to the system.',
             tags: ['Video'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 courseId: { type: 'string', description: 'ID of the course the video belongs to', example: 'course123-xyz789' },
                                 title: { type: 'string', description: 'Title of the video', example: 'Introduction to JavaScript' },
                                 videoUrl: { type: 'string', description: 'URL of the video', example: 'https://example.com/video.mp4' },
                                 duration: { type: 'integer', description: 'Duration of the video in minutes', example: 10 },
                             },
                             required: ['title', 'url', 'duration', 'courseId'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'Video uploaded successfully.' },
                 400: { description: 'Invalid input data.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
     '/video/course/{courseId}': {
         get: {
             summary: 'Get Videos by Course',
             description: 'Fetches all videos related to a specific course.',
             tags: ['Video'],
             parameters: [
                 {
                     in: 'path',
                     name: 'courseId',
                     required: true,
                     description: 'ID of the course to fetch videos for',
                     schema: { type: 'string' },
                     example: 'course123-xyz789',
                 },
             ],
             responses: {
                 200: { description: 'List of videos fetched successfully.' },
                 400: { description: 'Invalid course ID provided.' },
                 404: { description: 'No videos found for the given course.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default videoRouterDoc;
 