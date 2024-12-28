
enum UserRole{
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN'
}

enum ProgressStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE',
    IN_PROGRESS = 'IN_PROGRESS'
}

enum AuthStatus {
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

enum ItemType {
    VIDEO = 'VIDEO',
    ARTICLE = 'ARTICLE',
    ASSESSMENT = 'ASSESSMENT'
}

enum QuestionType{
    MCQ = 'MCQ',
    MSQ = 'MSQ',
    NAT = 'NAT',
    DESC = 'DESC'
}

interface Course {
    courseId: string;
    courseInstanceId: string
    name: string;
    description: string;
    status: ProgressStatus;
}

interface Module {
    moduleId: string;
    title: string;
    description: string;
    sequence: number;
    status: ProgressStatus;
}

interface Section {
    sectionId: string;
    title: string;
    description: string;
    sequence: number;
    status: ProgressStatus;
}

interface SectionItem {
    sectionItemId: string;
    title: string;
    description: string;
    sequence: number;
    type: ItemType;
    status: ProgressStatus;
    details: Assessment | Video | Article;
}

interface Question {
    questionId: string;
    questionText: string;
    questionType: string;
    options: Option[] | null;
    chosenOptions: Option[] | null;
    chosenOption: Option | null;
    studentAnswerValue: number | null;
    studentAnswerText: string | null;
}

interface Option {
    optionId: string;
    optionText: string;
}

interface Assessment {
    assessmentId: string;
    title: string;
    description: string;
    questions: Question[];
}

// User interface
interface User {
    userId: string;
    userName: string;
    email: string;
    role: UserRole;
}

interface AuthState {
    user: User | null;
    status: AuthStatus;
    error: string | null;
}

interface Video {
    videoId: string;
    title: string;
    description: string;
    url: string;
    startTime: number;
    endTime: number;
}

interface Article {
    articleId: string;
    content: string;
}

interface CourseViewState {
    courses: Course[] | null;
    modules: Module[] | null;
    sections: Section[] | null;
    sectionItems: SectionItem[]| null;
    currentCourse: Course | null;
    currentModule: Module | null;
    currentSection: Section | null;
    currentSectionItem: SectionItem | null;
    currentSectionItemDetails: Assessment | Video | Article | null; 
}


interface AppState {
    auth: AuthState;
    courseView: CourseViewState;
}


