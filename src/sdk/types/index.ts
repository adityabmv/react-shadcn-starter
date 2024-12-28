// sdk/types/index.ts
export enum UserRole {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN',
}

export enum ProgressStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE',
    IN_PROGRESS = 'IN_PROGRESS',
}

// User interface
export interface User {
    userId: string;
    userName: string;
    email: string;
    role: UserRole;
}

// Core Engine Course Structure
export interface CoreEngineCourse {
    courseId: string;
    name: string;
    description: string;
}

// Activity Engine Course Progress
export interface CourseProgress {
    courseId: string;
    progress: ProgressStatus;
}

// Processed Course Structure for Frontend
export interface Course {
    courseId: string;
    courseInstanceId: string;
    name: string;
    description: string;
    status: ProgressStatus;
}
