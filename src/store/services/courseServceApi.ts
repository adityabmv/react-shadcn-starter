import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Course, ProgressStatus } from '../../sdk/types/index'

// Mock Data
const mockCoreCourses = [
  {
    courseId: 'c1',
    courseInstanceId: 'ci1',
    name: 'Course 1',
    description: 'This is course 1',
  },
  {
    courseId: 'c2',
    courseInstanceId: 'ci2',
    name: 'Course 2',
    description: 'This is course 2',
  },
];

const mockProgressStatus: { [key: string]: ProgressStatus } = {
  ci1: ProgressStatus.IN_PROGRESS,
  ci2: ProgressStatus.COMPLETE,
};

// Mock SDK Functions
const calSDK = {
  core: {
    async getCourses(userId: string) {
      console.log(`Fetching courses for userId: ${userId}`);
      return mockCoreCourses;
    },
  },
  activity: {
    async getCourseProgress(userId: string, courseInstanceId: string) {
      console.log(`Fetching progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}`);
      return mockProgressStatus[courseInstanceId] || ProgressStatus.INCOMPLETE;
    },
  },
};

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUserCourses: builder.query<Course[], string>({
      async queryFn(userId, _queryApi, _extraOptions, fetchBaseQuery): Promise<{ data: Course[] } | { error: FetchBaseQueryError }> {
        try {
          const coreCourses = await calSDK.core.getCourses(userId);

          const coursesWithStatus = await Promise.all(
            coreCourses.map(async (course: any) => {
              const status: ProgressStatus = await calSDK.activity.getCourseProgress(
                userId,
                course.courseInstanceId
              );
              return { ...course, status };
            })
          );

          return { data: coursesWithStatus };
        } catch (error) {
          return { error: error as FetchBaseQueryError};
        }
      },
    }),
  }),
});

export const { useGetUserCoursesQuery } = courseApi;
