import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { calSDK, ProgressStatus } from './sdk';

export const activityApi = createApi({
    reducerPath: 'activityApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['CourseProgress', 'ModuleProgress'],
    endpoints: (builder) => ({
        getCourseProgress: builder.query<ProgressStatus, { userId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, courseInstanceId }) => {
                const progress = await calSDK.activity.getCourseProgress(userId, courseInstanceId);
                return { data: progress };
            },
            providesTags: (result, error, { userId, courseInstanceId }) => [{ type: 'CourseProgress', id: courseInstanceId }],
        }),
        getModuleProgress: builder.query<ProgressStatus, string>({
            queryFn: async (moduleId) => {
                const progress = await calSDK.activity.getModuleProgress(moduleId);
                return { data: progress };
            },
            providesTags: (result, error, moduleId) => [{ type: 'ModuleProgress', id: moduleId }],
        }),
        updateCourseProgress: builder.mutation<void, { userId: string; courseInstanceId: string; }>({
            queryFn: async ({ userId, courseInstanceId }) => {
                await calSDK.activity.updateCourseProgress(userId, courseInstanceId);
                return { data: undefined };
            },
            invalidatesTags: (result, error, { courseInstanceId }) => [
                { type: "CourseProgress", id: courseInstanceId },
            ],
        }),
        updateModuleProgress: builder.mutation<void, { userId: string, moduleId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, courseInstanceId, moduleId }) => {
                await calSDK.activity.updateModuleProgress(userId, courseInstanceId, moduleId);
                return { data: undefined };
            },
            invalidatesTags: (result, error, { moduleId }) => [{ type: 'ModuleProgress', id: moduleId }],
        }),
    }),
});

export const { useGetCourseProgressQuery, useGetModuleProgressQuery, useUpdateCourseProgressMutation, useUpdateModuleProgressMutation } = activityApi;
