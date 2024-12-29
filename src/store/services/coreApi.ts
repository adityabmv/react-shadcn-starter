import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { calSDK, Course, Module } from './sdk';

export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Courses', 'Modules'], // Tags for caching and invalidation
  endpoints: (builder) => ({
    // Fetch all courses for a specific user
    getCourses: builder.query<Course[], { userId: string }>({
      queryFn: async ({ userId }) => {
        const courses = await calSDK.core.getCourses(userId);
        return { data: courses };
      },
      providesTags: (result) =>
        result
          ? result.map((course) => ({ type: 'Courses', id: course.courseId }))
          : ['Courses'],
    }),

    // Fetch modules for a specific course
    getModules: builder.query<Module[], { courseId: string }>({
      queryFn: async ({ courseId }) => {
        const modules = await calSDK.core.getModules(courseId);
        return { data: modules };
      },
      providesTags: (result, error, courseId) =>
        result ? result.map((module) => ({ type: 'Modules', id: module.moduleId })) : [],
    }),
  }),
});

export const { useGetCoursesQuery, useGetModulesQuery } = coreApi;
