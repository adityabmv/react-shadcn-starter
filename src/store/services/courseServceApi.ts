import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Course, Module, Section, SectionItem, Article, Video, Assessment, Question, Option, ProgressStatus } from '../slices/courseViewSlice';

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

const mockModuleDataFromCore = [
  {
    moduleId: 'm1',
    title: 'Module 1',
    description: 'This is module 1',
    sequence: 1,
  },
  {
    moduleId: 'm2',
    title: 'Module 2',
    description: 'This is module 2',
    sequence: 2,
  },
]

const mockData: {
  core: {
    courses:any;
    modules:any;
    sections:any;
    sectionItems:any;
    video:any;
  };
  activity: {
    courseProgess: { [key: string]: ProgressStatus };
    moduleProgress: { [key: string]: ProgressStatus };
    sectionProgress: { [key: string]: ProgressStatus };
    sectionItemProgress: { [key: string]: ProgressStatus };
  };
} = {
  core: {
    courses: [
      {
        courseId: 'c1',
        courseInstanceId: 'ci1',
        name: 'Introduction To Machine Learning',
        description: 'This is course 1',
      },
      {
        courseId: 'c2',
        courseInstanceId: 'ci2',
        name: 'Course 2',
        description: 'This is course 2',
      },
    ],
    modules: [
      {
        moduleId: 'm1',
        title: 'Module 1',
        description: 'This is module 1',
        sequence: 1,
      },
      {
        moduleId: 'm2',
        title: 'Module 2',
        description: 'This is module 2',
        sequence: 2,
      },
    ],
    sections: [
      {
        sectionId: 's1',
        title: 'Section 1',
        description: 'This is section 1',
        sequence: 1,
      },
      {
        sectionId: 's2',
        title: 'Section 2',
        description: 'This is section 2',
        sequence: 2,
      },
    ],
    sectionItems: [
      {
        sectionItemId: 'si1',
        title: 'Article 1',
        description: 'This is article 1',
        sequence: 1,
        type: 'ARTICLE',
      },
      {
        sectionItemId: 'si2',
        title: 'Video 1',
        description: 'This is video 1',
        sequence: 2,
        type: 'VIDEO',
      },
    ],
    video: { 
      videoId: 'si1',
      assessmentId: 'ai1',
      url: 'https://www.youtube.com/watch?v=1',
    },

  },
  activity: {
    courseProgess:{
      ci1: ProgressStatus.IN_PROGRESS,
      ci2: ProgressStatus.INCOMPLETE,
    },
    moduleProgress: {
      m1: ProgressStatus.COMPLETE,
      m2: ProgressStatus.IN_PROGRESS,
      m3: ProgressStatus.INCOMPLETE,
    },
    sectionProgress: {
      s1: ProgressStatus.COMPLETE,
      s2: ProgressStatus.IN_PROGRESS,
      s3: ProgressStatus.INCOMPLETE,
    },
    sectionItemProgress: {
      si1: ProgressStatus.COMPLETE,
      si2: ProgressStatus.IN_PROGRESS,
    },
  },
}

// Mock SDK Functions
const calSDK = {
  core: {
    async getCourses(userId: string) {
      console.log(`Fetching courses for userId: ${userId}`);
      return mockData.core.courses;
    },
    async getModules(courseId: string) {
      console.log(`Fetching modules for courseInstanceId: ${courseId}`);
      return mockData.core.modules;
    },
    async getSections(moduleId: string) {
      console.log(`Fetching sections for moduleId: ${moduleId}`);
      return mockData.core.sections;
    },
    async getSectionItems(sectionId: string) {
      console.log(`Fetching section items for sectionId: ${sectionId}`);
      return mockData.core.sectionItems;
    },
    async getVideo(sectionItemId: string) {
      console.log(`Fetching video for sectionItemId: ${sectionItemId}`);
      return mockData.core.video;
    },
  },
  activity: {
    async getCourseProgress(userId: string, courseInstanceId: string) {
      console.log(`Fetching progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}`);
      return mockData.activity.courseProgess[courseInstanceId] || ProgressStatus.INCOMPLETE;
    },
    async getModuleProgress(userId: string, courseInstanceId: string, moduleId: string) {
      console.log(`Fetching progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, moduleId: ${moduleId}`);
      return mockData.activity.moduleProgress[moduleId] || ProgressStatus.INCOMPLETE;
    },
    async getSectionProgress(userId: string, courseInstanceId: string, sectionId: string) {
      console.log(`Fetching progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, sectionId: ${sectionId}`);
      return mockData.activity.sectionProgress[sectionId] || ProgressStatus.INCOMPLETE;
    },
    async getSectionItemProgress(userId: string, courseInstanceId: string, sectionItemId: string) {
      console.log(`Fetching progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, sectionItemId: ${sectionItemId}`);
      return mockData.activity.sectionItemProgress[sectionItemId] || ProgressStatus.INCOMPLETE;
    },


    async updateCourseProgress(userId: string, courseInstanceId: string, progress: ProgressStatus) {
      console.log(`Updating progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, progress: ${progress}`);
      mockData.activity.courseProgess[courseInstanceId] = progress;
      return Promise.resolve();
    },
    async updateModuleProgress(userId: string, courseInstanceId: string, moduleId: string, progress: ProgressStatus) {
      console.log(`Updating progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, moduleId: ${moduleId}, progress: ${progress}`);
      mockData.activity.moduleProgress[moduleId] = progress;
      return Promise.resolve();
    },
    async updateSectionProgress(userId: string, courseInstanceId: string, sectionId: string, progress: ProgressStatus) {
      console.log(`Updating progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, sectionId: ${sectionId}, progress: ${progress}`);
      mockData.activity.sectionProgress[sectionId] = progress;
      return Promise.resolve();
    },
    async updateSectionItemProgress(userId: string, courseInstanceId: string, sectionItemId: string, progress: ProgressStatus) {
      console.log(`Updating progress for userId: ${userId}, courseInstanceId: ${courseInstanceId}, sectionItemId: ${sectionItemId}, progress: ${progress}`);
      mockData.activity.sectionItemProgress[sectionItemId] = progress;
      return Promise.resolve();
    }
   
  },
};

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


// Function to update course progress
const updateCourseProgress = async (
  { userId, courseInstanceId, progress }: { userId: string; courseInstanceId: string; progress: ProgressStatus }
): Promise<{ data: void } | { error: FetchBaseQueryError }> => {
  try {
    await calSDK.activity.updateCourseProgress(userId, courseInstanceId, progress);
    await mockDelay(1000);
    return { data: undefined };
  } catch (error) {
    return { error: error as FetchBaseQueryError };
  }
};

// Function to fetch user courses with progress
const fetchUserCourses = async (
  userId: string
): Promise<{ data: Course[] } | { error: FetchBaseQueryError }> => {
  try {
    await mockDelay(2000);
    const coreCourses = await calSDK.core.getCourses(userId);

    const coursesWithProgress = await Promise.all(
      coreCourses.map(async (course: { courseInstanceId: string }) => {
        const progress = await calSDK.activity.getCourseProgress(userId, course.courseInstanceId);
        return { ...course, progress };
      })
    );

    return { data: coursesWithProgress };
  } catch (error) {
    return { error: error as FetchBaseQueryError };
  }
};

// Redux Toolkit Query API definition
export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUserCourses: builder.query<Course[], string>({
      queryFn: (userId) => fetchUserCourses(userId), // Use fetchUserCourses here
    }),
    updateCourseProgress: builder.mutation<void, { userId: string; courseInstanceId: string; progress: ProgressStatus }>({
      queryFn: updateCourseProgress, // Use updateCourseProgress here
    }),
  }),
});

// Export the hooks for use in components
export const { useGetUserCoursesQuery } = courseApi;
