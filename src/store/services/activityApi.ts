import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProgressStatus } from '../slices/courseViewSlice';

interface CourseProgressResponse {
    progress: ProgressStatus;
}

interface UpdatedEntities {
    course: string | null;
    modules: string[] | null;
    sections: string[] | null;
    sectionItems: string[] | null;
}

export const activityApi = createApi({
    reducerPath: 'activityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/v1/' }),
    tagTypes: ['CourseProgress', 'ModuleProgress', 'SectionProgress', 'SectionItemProgress'],
    endpoints: (builder) => ({
        // Query for fetching course progress
        getCourseProgress: builder.query<CourseProgressResponse, { studentId: string; courseInstanceId: string }>({
            query: ({ studentId, courseInstanceId }) =>
                `course-progress/course?courseInstanceId=${courseInstanceId}&studentId=${studentId}`,
            providesTags: (result, error, { studentId, courseInstanceId }) => [
                { type: 'CourseProgress', id: `${studentId}-${courseInstanceId}` },
            ],
        }),
        getModuleProgress: builder.query<ProgressStatus, { studentId: string; courseInstanceId: string; moduleId: string }>({
            query: ({ studentId, courseInstanceId, moduleId }) =>
                `course-progress/module?courseInstanceId=${courseInstanceId}&moduleId=${moduleId}&studentId=${studentId}`,
            providesTags: (result, error, { studentId, courseInstanceId, moduleId }) => [
                { type: 'ModuleProgress', id: `${studentId}-${moduleId}` },
            ],
        }),
        getSectionProgress: builder.query<ProgressStatus, { studentId: string; courseInstanceId: string; sectionId: string }>({
            query: ({ studentId, courseInstanceId, sectionId }) =>
                `course-progress/section?courseInstanceId=${courseInstanceId}&sectionId=${sectionId}&studentId=${studentId}`,
            providesTags: (result, error, { studentId, courseInstanceId, sectionId }) => [
                { type: 'SectionProgress', id: `${studentId}-${sectionId}` },
            ],
        }),
        getSectionItemProgress: builder.query<ProgressStatus, { studentId: string; courseInstanceId: string; sectionItemId: string }>({
            query: ({ studentId, courseInstanceId, sectionItemId }) =>
                `course-progress/section-item?courseInstanceId=${courseInstanceId}&sectionItemId=${sectionItemId}&studentId=${studentId}`,
            providesTags: (result, error, { studentId, courseInstanceId, sectionItemId }) => [
                { type: 'SectionItemProgress', id: `${studentId}-${sectionItemId}` },
            ],
        }),

        updateSectionItemProgress: builder.mutation<UpdatedEntities, { studentId: string; sectionItemId: string }>({
            query: ({ studentId, sectionItemId }) => ({
                url: `course-progress/section-item`,
                method: 'POST',
                body: { studentId, sectionItemId },
            }),
            invalidatesTags: (result, error, { studentId }) => {
                const tags: any[] = [];

                if (result) {
                    if (result.sectionItems) {
                        result.sectionItems.forEach((itemId) =>
                            tags.push({ type: 'SectionItemProgress', id: `${studentId}-${itemId}` })
                        );
                    }
                    if (result.sections) {
                        result.sections.forEach((sectionId) =>
                            tags.push({ type: 'SectionProgress', id: `${studentId}-${sectionId}` })
                        );
                    }
                    if (result.modules) {
                        result.modules.forEach((moduleId) =>
                            tags.push({ type: 'ModuleProgress', id: `${studentId}-${moduleId}` })
                        );
                    }
                    if (result.course) {
                        tags.push({ type: 'CourseProgress', id: `${studentId}-${result.course}` });
                    }
                }

                return tags;
            },
        }),
    }),
});

// Export the hooks for the queries and mutations
export const {
    useGetCourseProgressQuery,
    useGetModuleProgressQuery,
    useGetSectionProgressQuery,
    useGetSectionItemProgressQuery,
    useUpdateSectionItemProgressMutation,
} = activityApi;