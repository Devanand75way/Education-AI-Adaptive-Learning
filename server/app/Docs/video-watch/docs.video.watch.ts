export const videoWatchRouterDoc = {
     '/video-watch/': {
         post: {
             summary: 'Record Video Watch Activity',
             description: 'Records when a user watches a video.',
             tags: ['Video Watch'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 userId: { type: 'string', description: 'ID of the user watching the video', example: 'user123-abc456' },
                                 videoId: { type: 'string', description: 'ID of the video being watched', example: 'video789-xyz321' },

                             },
                             required: ['userId', 'videoId'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'Watch activity recorded successfully.' },
                 400: { description: 'Invalid input data.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
     '/video-watch/user/{userId}': {
         get: {
             summary: 'Get Watched Videos by User',
             description: 'Fetches all videos watched by a specific user.',
             tags: ['Video Watch'],
             parameters: [
                 {
                     in: 'path',
                     name: 'userId',
                     required: true,
                     description: 'ID of the user to fetch watched videos for',
                     schema: { type: 'string' },
                     example: 'user123-abc456',
                 },
             ],
             responses: {
                 200: { description: 'List of watched videos fetched successfully.' },
                 400: { description: 'Invalid user ID provided.' },
                 404: { description: 'No watched videos found for the given user.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default videoWatchRouterDoc;
 