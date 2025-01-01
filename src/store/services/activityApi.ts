import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProgressStatus } from '../slices/courseViewSlice';
import { get } from 'http';

interface CourseProgressResponse {
    progress: ProgressStatus;
}

export const activityApi = createApi({
    reducerPath: 'activityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/v1/' }),
    tagTypes: ['CourseProgress'],
    endpoints: (builder) => ({
        // Query for fetching course progress
        getCourseProgress: builder.query<CourseProgressResponse, { studentId: string; courseInstanceId: string }>({
            query: ({ studentId, courseInstanceId }) =>
                `course-progress/course?courseInstanceId=${courseInstanceId}&studentId=${studentId}`,
            providesTags: (result, error, { studentId, courseInstanceId }) => [{ type: 'CourseProgress', id: `${studentId}-${courseInstanceId}` }],
        },),
        getModuleProgress: builder.query<ProgressStatus, { studentId: string; courseInstanceId: string; moduleId: string }>({
            query: ({ studentId,courseInstanceId, moduleId }) =>
                `course-progress/module?courseInstanceId=${courseInstanceId}&moduleId=${moduleId}&studentId=${studentId}`,
            
        }),
    }),
});

// Export the hooks for the query
export const {
    useGetCourseProgressQuery,
} = activityApi;