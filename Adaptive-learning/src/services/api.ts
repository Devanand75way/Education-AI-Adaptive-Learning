import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  ApiResponse,
  User,
  Course,
  CourseEnrollment,
  Video,
  VideoWatch,
  Quiz,
  QuizAttempt,
  FeedbackReport,
} from "../types";

const baseurl = import.meta.env.VITE_SERVER_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // User Authentication
    register: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      ApiResponse<{ accessToken: string; refreshToken: string; userId: string }>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/users/auth",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),

    // Courses
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
    }),
    getCourses: builder.query<Course[], void>({
      query: () => "/courses",
    }),

    // Course Enrollment
    enrollInCourse: builder.mutation<CourseEnrollment, { userId: string; courseId: string }>({
      query: (body) => ({
        url: "/course-enrollment",
        method: "POST",
        body,
      }),
    }),
    getUserEnrollments: builder.query<CourseEnrollment[], { userId: string }>({
      query: ({ userId }) => `/course-enrollment/${userId}`,
    }),

    // Videos
    uploadVideo: builder.mutation<Video, Partial<Video>>({
      query: (body) => ({
        url: "/videos",
        method: "POST",
        body,
      }),
    }),
    getVideosByCourse: builder.query<Video[], { courseId: string }>({
      query: ({ courseId }) => `/videos/${courseId}`,
    }),

    // Video Watch
    markVideoAsWatched: builder.mutation<VideoWatch, { userId: string; videoId: string }>({
      query: (body) => ({
        url: "/video-watch",
        method: "POST",
        body,
      }),
    }),
    getWatchedVideos: builder.query<VideoWatch[], { userId: string }>({
      query: ({ userId }) => `/video-watch/${userId}`,
    }),

    // Quizzes
    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (body) => ({
        url: "/quiz/",
        method: "POST",
        body,
      }),
    }),
    getQuizzesByCourse: builder.query<Quiz[], { courseId: string }>({
      query: ({ courseId }) => `/quizzes/${courseId}`,
    }),

    // Quiz Attempt
    attemptQuiz: builder.mutation<QuizAttempt, { userId: string; quizId: string }>({
      query: (body) => ({
        url: "/quiz-attempt/",
        method: "POST",
        body,
      }),
    }),
    getQuizAttemptsByUser: builder.query<QuizAttempt[], { userId: string }>({
      query: ({ userId }) => `/quiz-attempts/${userId}`,
    }),

    // Feedback Report
    submitFeedbackReport: builder.mutation<FeedbackReport, Partial<FeedbackReport>>({
      query: (body) => ({
        url: "/feedback-report/user-feedback",
        method: "POST",
        body,
      }),
    }),
    getFeedbackReports: builder.query<FeedbackReport[], {userId : string}>({
      query: ({userId}) => `/feedback-report//${userId}`,
    }),
    getModalFeedbackReports: builder.mutation<FeedbackReport[], void>({
      query: (body) => ({
          url : `http://127.0.0.1:5000/predict_feedback`,
          method : "POST",
          body,
      })
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,

  useCreateCourseMutation,
  useGetCoursesQuery,

  useEnrollInCourseMutation,
  useGetUserEnrollmentsQuery,

  useUploadVideoMutation,
  useGetVideosByCourseQuery,

  useMarkVideoAsWatchedMutation,
  useGetWatchedVideosQuery,

  useCreateQuizMutation,
  useGetQuizzesByCourseQuery,

  useAttemptQuizMutation,
  useGetQuizAttemptsByUserQuery,

  useSubmitFeedbackReportMutation,
  useGetFeedbackReportsQuery,
 useGetModalFeedbackReportsMutation
} = api;
