import { createSlice, PayloadAction } from "@reduxjs/toolkit";
enum ProgressStatus {
    INCOMPLETE = 'INCOMPLETE',
    COMPLETE = 'COMPLETE',
    IN_PROGRESS = 'IN_PROGRESS'
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
}

interface Module {
    moduleId: string;
    title: string;
    description: string;
    sequence: number;
    progress: ProgressStatus;
}

interface Section {
    sectionId: string;
    title: string;
    description: string;
    sequence: number;
    progress: ProgressStatus;
}

interface SectionItem {
    sectionItemId: string;
    title: string;
    description: string;
    sequence: number;
    type: ItemType;
    progress: ProgressStatus;
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

const initialState: CourseViewState = {
    courses: null,
    modules: null,
    sections: null,
    sectionItems: null,
    currentCourse: null,
    currentModule: null,
    currentSection: null,
    currentSectionItem: null,
    currentSectionItemDetails: null
}


const courseViewSlice = createSlice({
    name: 'courseView',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<Course[]>) {
            state.courses = action.payload;
        },
        setCurrentCourse(state, action: PayloadAction<Course>) {
            state.currentCourse = action.payload;
        },
        setModules(state, action: PayloadAction<Module[]>) {
            state.modules = action.payload;
        },
        setCurrentModule(state, action: PayloadAction<Module>) {
            state.currentModule = action.payload;
        },
        setSections(state, action: PayloadAction<Section[]>) {
            state.sections = action.payload;
        },
        setCurrentSection(state, action: PayloadAction<Section>) {
            state.currentSection = action.payload;
        },
        setSectionItems(state, action: PayloadAction<SectionItem[]>) {
            state.sectionItems = action.payload;
        },
        setCurrentSectionItem(state, action: PayloadAction<SectionItem>) {
            state.currentSectionItem = action.payload;
        },
        setCurrentSectionItemDetails(state, action: PayloadAction<Assessment | Video | Article>) {
            state.currentSectionItemDetails = action.payload;
        }
    }
})

export const selectCurrentCourse = (state: {courseView: CourseViewState}) => state.courseView.currentCourse;

export { ProgressStatus, ItemType, QuestionType };
export type { Course, Module, Section, SectionItem, Question, Option, Assessment, Video, Article, CourseViewState };
export const { setCourses, setCurrentCourse, setModules, setCurrentModule, setSections, setCurrentSection, setSectionItems, setCurrentSectionItem, setCurrentSectionItemDetails } = courseViewSlice.actions;
export default courseViewSlice.reducer;