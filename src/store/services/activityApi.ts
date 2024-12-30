import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { calSDK, ProgressStatus } from './sdk';
import { get } from 'http';

export const activityApi = createApi({
    reducerPath: 'activityApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['CourseProgress', 'ModuleProgress', 'SectionProgress'],
    endpoints: (builder) => ({
        getCourseProgress: builder.query<ProgressStatus, { userId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, courseInstanceId }) => {
                const progress = await calSDK.activity.getCourseProgress(userId, courseInstanceId);
                return { data: progress };
            },
            providesTags: (result, error, { userId, courseInstanceId }) => [{ type: 'CourseProgress', id: courseInstanceId }],
        }),
        getModuleProgress: builder.query<ProgressStatus, { userId: string, moduleId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, moduleId, courseInstanceId }) => {
                const progress = await calSDK.activity.getModuleProgress(userId, moduleId, courseInstanceId);
                return { data: progress };
            },
            providesTags: (result, error, { userId, moduleId, courseInstanceId }) => [{ type: 'ModuleProgress', id: moduleId }],
        }),
        getSectionProgress: builder.query<ProgressStatus, { userId: string, sectionId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, sectionId, courseInstanceId }) => {
                const progress = await calSDK.activity.getSectionProgress(userId, sectionId, courseInstanceId);
                return { data: progress };
            },
            providesTags: (result, error, { userId, sectionId, courseInstanceId }) => [{ type: 'SectionProgress', id: sectionId }],
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
        updateModuleProgress: builder.mutation<{updatedModules: string[], updatedCourse: string}, { userId: string, moduleId: string, courseInstanceId: string }>({
            queryFn: async ({ userId, courseInstanceId, moduleId }) => {
                const updatedEntities = await calSDK.activity.updateModuleProgress(userId, courseInstanceId, moduleId);
                return { data: updatedEntities };
            },
            invalidatesTags: (result, error, { moduleId }) =>{
                if (!result) return [{ type: 'ModuleProgress' as const, id: moduleId }];
                const invalidatesTags = [
                    ...result.updatedModules.map((moduleId: string) => ({ type: 'ModuleProgress' as const, id: moduleId })),
                    { type: 'CourseProgress' as const, id: result.updatedCourse }
                ]
                return invalidatesTags;
                
            },
        }),
        updateSectionProgress: builder.mutation<void, { userId: string, courseInstanceId: string, sectionId: string, progress: ProgressStatus }>({
            queryFn: async ({ userId, courseInstanceId, sectionId, progress }) => {
                await calSDK.activity.updateSectionProgress(userId, courseInstanceId, sectionId);
                return { data: undefined };
            },
            invalidatesTags: (result, error, { sectionId }) => {
                return [{ type: 'SectionProgress', id: sectionId }]
            },
        }),
    }),
});

export const {
    useGetCourseProgressQuery,
    useGetModuleProgressQuery,
    useGetSectionProgressQuery

} = activityApi;
export const {
    useUpdateCourseProgressMutation,
    useUpdateModuleProgressMutation,
    useUpdateSectionProgressMutation
} = activityApi;
