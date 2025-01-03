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

export interface Section{
    sectionId: string,
    title: string,
    description: string,
    sequence: number
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
                courseId: "courseXYZ",
                courseInstanceId: "course",
                name: "Introduction To Machine Learning",
                description: "This is course 1",
            }
        ],
        modules: [
            {
                moduleId: "mod1",
                title: "Module 1",
                description: "This is module 1",
                sequence: 1,
            },
            // {
            //     moduleId: "mod2",
            //     title: "Module 2",
            //     description: "This is module 2",
            //     sequence: 2,
            // },
            // {
            //     moduleId: "mod3",
            //     title: "Module 3",
            //     description: "This is module 3",
            //     sequence: 3,
            // },
            // {
            //     moduleId: "mod4",
            //     title: "Module 4",
            //     description: "This is module 4",
            //     sequence: 4,
            // }
        ],
        sections: [
            {
                sectionId: "sec1",
                title: "Section 1",
                description: "This is section 1",
                sequence: 1,
            },
            // {
            //     sectionId: "sec2",
            //     title: "Section 2",
            //     description: "This is section 2",
            //     sequence: 2,
            // },
            // {
            //     sectionId: "sec3",
            //     title: "Section 3",
            //     description: "This is section 3",
            //     sequence: 3,
            // },
            // {
            //     sectionId: "sec4",
            //     title: "Section 4",
            //     description: "This is section 4",
            //     sequence: 4,
            // }
        ],
        sectionItems: [
            {
                sectionItemId: "item1",
                title: "Video 1",
                description: "This is video 1",
                sequence: 1,
                type: "VIDEO",
            },
            // {
            //     sectionItemId: "item2",
            //     title: "Video 1",
            //     description: "This is video 1",
            //     sequence: 2,
            //     type: "VIDEO",
            // },
            // {
            //     sectionItemId: "item3",
            //     title: "Assessment 1",
            //     description: "This is assessment 1",
            //     sequence: 3,
            //     type: "ASSESSMENT",
            // },
            // {
            //     sectionItemId: "item4",
            //     title: "Article 2",
            //     description: "This is article 2",
            //     sequence: 4,
            //     type: "ARTICLE",
            // }
        ],
        video: {
            videoId: "item1",
            assessmentId: "assessment1",
            url: "https://www.youtube.com/watch?v=1",
        },
    },
    activity: {
        courseProgess: {
            course: ProgressStatus.IN_PROGRESS,
        },
        moduleProgress: {
            mod1: ProgressStatus.IN_PROGRESS,
            mod2: ProgressStatus.INCOMPLETE,
            mod3: ProgressStatus.INCOMPLETE,
        },
        sectionProgress: {
            sec1: ProgressStatus.IN_PROGRESS,
            sec2: ProgressStatus.COMPLETE,
            sec3: ProgressStatus.INCOMPLETE,
        },
        sectionItemProgress: {
            item1: ProgressStatus.IN_PROGRESS,
            item2: ProgressStatus.INCOMPLETE,
            item3: ProgressStatus.INCOMPLETE,
            item4: ProgressStatus.INCOMPLETE,
        },
    },
};

const mockProgressData: {
    courses: { [key: string]: ProgressStatus };
    modules: { [key: string]: ProgressStatus };
    sections: { [key: string]: ProgressStatus };
    sectionItems: { [key: string]: ProgressStatus };
} = {
    courses: {
        course: ProgressStatus.IN_PROGRESS,
    },
    modules: {
        mod1: ProgressStatus.IN_PROGRESS,
        mod2: ProgressStatus.INCOMPLETE,
        mod3: ProgressStatus.INCOMPLETE,
        mod4: ProgressStatus.INCOMPLETE,
    },
    sections: {
        sec1: ProgressStatus.IN_PROGRESS,
        sec2: ProgressStatus.INCOMPLETE,
    },
    sectionItems: {
        item1: ProgressStatus.IN_PROGRESS,
        item2: ProgressStatus.INCOMPLETE
    }
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
        async getSections(courseId: string, moduleId: string): Promise<Section[]>{
            console.log()
            await mockDelay(2000);
            return mockData.core.sections[moduleId];
        } 
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
        ): Promise<{ updatedModules: string[], updatedCourse: string }> {
            const newProgress = mockProgressData.modules[moduleId] === ProgressStatus.INCOMPLETE
                ? ProgressStatus.IN_PROGRESS
                : ProgressStatus.COMPLETE;
            console.log(`Updating progress for moduleId: ${moduleId} to ${newProgress}`);
            await mockDelay(1000);
            mockProgressData.modules[moduleId] = newProgress;

            // a boolean to know if there is a next module in sequence or not
            const currentModule = mockData.core.modules.find((module) => module.moduleId === moduleId);
            const nextModule = mockData.core.modules.find((module) => module.sequence === (currentModule?.sequence ?? 0) + 1);

            // if there is no next module, we update the course progress
            if (!nextModule) {
                await calSDK.activity.updateCourseProgress(userId, courseInstanceId);
            }
            // if there is a next module, we update the module progress of the next module
            else {
                const nextModuleProgress = mockProgressData.modules[nextModule.moduleId] === ProgressStatus.INCOMPLETE
                    ? ProgressStatus.IN_PROGRESS
                    : ProgressStatus.COMPLETE;
                console.log(`Updating progress for next moduleId: ${nextModule.moduleId} to ${nextModuleProgress}`);
                mockProgressData.modules[nextModule.moduleId] = nextModuleProgress;
            }

            return {
                updatedModules: [moduleId, nextModule?.moduleId].filter((id): id is string => !!id),
                updatedCourse: courseInstanceId,
            }

            

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
