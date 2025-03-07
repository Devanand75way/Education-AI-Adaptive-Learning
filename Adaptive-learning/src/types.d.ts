export interface ApiResponse<T> {
     success: boolean;
     message: string;
     data: T;
     accessToken : string;
   }
   
   // User Model
   export interface User {
     id: string;
     name: string;
     email: string;
     password?: string;
   }
   
   // Course Model
   export interface Course {
     id: string;
     title: string;
     description: string;
     price: number;
   }
   
   // Course Enrollment Model
   export interface CourseEnrollment {
     id: string;
     userId: string;
     courseId: string;
     enrolledAt: string;
   }
   
   // Video Model
   export interface Video {
     id: string;
     courseId: string;
     title: string;
     videoUrl: string;
     duration: number;
   }
   
   // Video Watch Model
   export interface VideoWatch {
     id: string;
     userId: string;
     videoId: string;
     watchedAt: string;
   }
   
   // Quiz Model
   export interface Quiz {
     id: string;
     courseId: string;
     topicName: string;
     difficulty: string;
   }
   
   // Quiz Attempt Model
   export interface QuizAttempt {
     id: string;
     userId: string;
     quizId: string;
     attemptedAt: string;
   }
   
   // Feedback Report Model
   export interface FeedbackReport {
     id: string;
     quizAttemptId: string;
     quizId: string;
     timeSpent: number;
     attempts: number;
     difficultyNumeric: number;
     accuracy: number;
     avgTimeSpent: number;
     questionId: number;
   }
   