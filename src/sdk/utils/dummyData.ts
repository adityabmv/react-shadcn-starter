import { ProgressStatus, CourseProgress, CoreEngineCourse } from '../types';

export const coreEngineDummyCourses: CoreEngineCourse[] = [
    { courseId: 'course-1', name: 'Math 101', description: 'Intro to Math' },
    { courseId: 'course-2', name: 'Science 101', description: 'Intro to Science' },
];

export const activityEngineDummyProgress: CourseProgress[] = [
    { courseId: 'course-1', progress: ProgressStatus.IN_PROGRESS }, // Use enum values
    { courseId: 'course-2', progress: ProgressStatus.COMPLETE },    // Use enum values
];

