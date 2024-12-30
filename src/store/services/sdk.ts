import { ProgressStatus } from "../slices/courseViewSlice";

// Mock Data
const mockCoreCourses: Course[] = [
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

const mockModuleDataFromCore: Module[] = [
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

export interface Course {
    courseId: string; // Unique ID for the course
    courseInstanceId: string; // Instance-specific identifier
    name: string; // Course name
    description: string; // Description of the course
}

export interface Module {
    moduleId: string; // Unique ID for the module
    title: string; // Module title
    description: string; // Module description
    sequence: number; // Sequence order within the course
}



const mockData: {
    core: {
        courses: Course[];
        modules: Module[];
        sections: any;
        sectionItems: any;
        video: any;
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
                courseId: "c1",
                courseInstanceId: "ci1",
                name: "Introduction To Machine Learning",
                description: "This is course 1",
            },
            {
                courseId: "c2",
                courseInstanceId: "ci2",
                name: "Course 2",
                description: "This is course 2",
            },
        ],
        modules: [
            {
                moduleId: "m1",
                title: "Module 1",
                description: "This is module 1",
                sequence: 1,
            },
            {
                moduleId: "m2",
                title: "Module 2",
                description: "This is module 2",
                sequence: 2,
            },
            {
                moduleId: "m3",
                title: "Module 3",
                description: "This is module 3",
                sequence: 3,
            },
            {
                moduleId: "m4",
                title: "Module 4",
                description: "This is module 4",
                sequence: 4,
            }
        ],
        sections: [
            {
                sectionId: "s1",
                title: "Section 1",
                description: "This is section 1",
                sequence: 1,
            },
            {
                sectionId: "s2",
                title: "Section 2",
                description: "This is section 2",
                sequence: 2,
            },
            {
                sectionId: "s3",
                title: "Section 3",
                description: "This is section 3",
                sequence: 3,
            },
            {
                sectionId: "s4",
                title: "Section 4",
                description: "This is section 4",
                sequence: 4,
            }
        ],
        sectionItems: [
            {
                sectionItemId: "si1",
                title: "Article 1",
                description: "This is article 1",
                sequence: 1,
                type: "ARTICLE",
            },
            {
                sectionItemId: "si2",
                title: "Video 1",
                description: "This is video 1",
                sequence: 2,
                type: "VIDEO",
            },
            {
                sectionItemId: "si3",
                title: "Assessment 1",
                description: "This is assessment 1",
                sequence: 3,
                type: "ASSESSMENT",
            },
            {
                sectionItemId: "si4",
                title: "Article 2",
                description: "This is article 2",
                sequence: 4,
                type: "ARTICLE",
            }
        ],
        video: {
            videoId: "si1",
            assessmentId: "ai1",
            url: "https://www.youtube.com/watch?v=1",
        },
    },
    activity: {
        courseProgess: {
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
};

const mockProgressData: {
    courses: { [key: string]: ProgressStatus };
    modules: { [key: string]: ProgressStatus };
    sections: { [key: string]: ProgressStatus };
} = {
    courses: {
        ci1: ProgressStatus.IN_PROGRESS,
        ci2: ProgressStatus.COMPLETE,
    },
    modules: {
        m1: ProgressStatus.COMPLETE,
        m2: ProgressStatus.IN_PROGRESS,
        m3: ProgressStatus.INCOMPLETE,
        m4: ProgressStatus.INCOMPLETE,
    },
    sections: {
        s1: ProgressStatus.COMPLETE,
        s2: ProgressStatus.IN_PROGRESS,
        s3: ProgressStatus.INCOMPLETE,
    },
};

const mockDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const calSDK = {
    core: {
        async getCourses(userId: string): Promise<Course[]> {
            console.log("Fetching all courses");
            await mockDelay(2000);
            return mockData.core.courses;
        },
        async getModules(courseId: string): Promise<Module[]> {
            console.log(`Fetching modules for course ID: ${courseId}`);
            await mockDelay(2000);
            return mockData.core.modules;
        },
    },
    activity: {
        async getCourseProgress(
            userId: string,
            courseInstanceId: string
        ): Promise<ProgressStatus> {
            console.log(`Fetching progress for courseInstanceId: ${courseInstanceId}`);
            await mockDelay(2000);
            return mockProgressData.courses[courseInstanceId] || ProgressStatus.INCOMPLETE;
        },
        async getModuleProgress(userId: string, moduleId: string, courseInstanceId: string): Promise<ProgressStatus> {
            console.log(`Fetching progress for moduleId: ${moduleId}`);
            await mockDelay(2000);
            return mockProgressData.modules[moduleId] || ProgressStatus.INCOMPLETE;
        },
        async getSectionProgress(userId: string, sectionId: string, courseInstanceId: string): Promise<ProgressStatus> {
            console.log(`Fetching progress for sectionId: ${sectionId}`);
            await mockDelay(2000);
            return mockData.activity.sectionProgress[sectionId] || ProgressStatus.INCOMPLETE;
        },
        async updateCourseProgress(
            userId: string,
            courseInstanceId: string,
        ): Promise<void> {

            const newProgress = mockProgressData.courses[courseInstanceId] === ProgressStatus.INCOMPLETE
                ? ProgressStatus.IN_PROGRESS
                : ProgressStatus.COMPLETE;
            await mockDelay(1000);
            console.log(
                `Updating progress for userId: ${userId}, courseInstanceId: ${courseInstanceId} to ${newProgress}`
            );
            mockProgressData.courses[courseInstanceId] = newProgress; // Simulate progress update
        },
        async updateModuleProgress(
            userId: string,
            courseInstanceId: string,
            moduleId: string,
        ): Promise<void> {
            const newProgress = mockProgressData.modules[moduleId] === ProgressStatus.INCOMPLETE
                ? ProgressStatus.IN_PROGRESS
                : ProgressStatus.COMPLETE;
            console.log(`Updating progress for moduleId: ${moduleId} to ${newProgress}`);
            await mockDelay(1000);
            mockProgressData.modules[moduleId] = newProgress;
        },
        async updateSectionProgress(
            userId: string,
            courseInstanceId: string,
            sectionId: string
        ): Promise<void> {
            const newProgress = mockData.activity.sectionProgress[sectionId] === ProgressStatus.INCOMPLETE
                ? ProgressStatus.IN_PROGRESS
                : ProgressStatus.COMPLETE;
            
            console.log(`Updating progress for sectionId: ${sectionId} to ${newProgress}`);
            await mockDelay(1000);
            mockData.activity.sectionProgress[sectionId] = newProgress;
        }
    },
};

export { ProgressStatus };
