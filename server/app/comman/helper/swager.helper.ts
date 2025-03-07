import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

import courseEnrollmentRouterDoc from '../../Docs/Course-Enrollment/docs.cours.enrollment';
import courseRouterDoc from '../../Docs/Courses/docs.courses';
import feedbackReportRouterDoc from '../../Docs/Feedback-Report/docs.feedback.report';
import quizRouterDoc from '../../Docs/Quiz/docs.quiz';
import quizAttemptRouterDoc from '../../Docs/Quiz-Attempt/docs.quiz.attempt';
import videoRouterDoc from '../../Docs/video/docs.video';
import videoWatchedRouterDoc from '../../Docs/Video-Watch/docs.video.watch';
import userRouterDoc from '../../Docs/User/docs.user';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js & TypeScript app',
    },
    paths: {
     ...userRouterDoc,
     ...courseRouterDoc,
     ...courseEnrollmentRouterDoc,
     ...videoRouterDoc,
     ...videoWatchedRouterDoc,
     ...quizRouterDoc,
     ...quizAttemptRouterDoc,
     ...feedbackReportRouterDoc,
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Change this based on your server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./app/routes/*.ts'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger Docs available at http://localhost:5000/api-docs');
};