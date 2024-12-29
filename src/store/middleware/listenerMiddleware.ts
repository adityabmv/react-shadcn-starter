import { createListenerMiddleware } from '@reduxjs/toolkit';
import { AuthState, selectUserId, setUser } from '../slices/auth';
import { setCourses, setCurrentCourse } from '../slices/courseViewSlice';
import { courseApi } from '../services/courseServceApi';
import { coreApi } from '../services/coreApi';
import { ProgressStatus } from '@/sdk/types';
import { activityApi } from '../services/activityApi';
import { RootState } from '@reduxjs/toolkit/query';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: coreApi.endpoints.getCourses.matchFulfilled, // Trigger when courses are successfully fetched
  effect: async (action, { dispatch, getState }) => {
    const courses = action.payload; // Extract fetched courses
    const userId = selectUserId(getState() as {auth: AuthState}) // Replace with dynamic userId from your auth state or context

    if (courses && courses.length > 0 && userId) {
      // Fetch progress for each course and determine default course
      let defaultCourse = null;

      for (const course of courses) {
        const progressResult = await dispatch(
          activityApi.endpoints.getCourseProgress.initiate({ userId, courseInstanceId: course.courseInstanceId })
        ).unwrap();

        // If a course with progress INCOMPLETE is found, set it as default and break
        if (progressResult === "INCOMPLETE") {
          defaultCourse = course;
          break;
        }
      }

      // Fallback to the first course if no INCOMPLETE course is found
      if (!defaultCourse) {
        defaultCourse = courses[0];
      }

      if (defaultCourse) {
        dispatch(setCurrentCourse(defaultCourse)); // Set the original course object
      }
    }
  },
});

// listenerMiddleware.startListening({
//   matcher: coreApi.endpoints.getCourses.matchFulfilled, // Listen for the fulfilled action
//   effect: async (action, { dispatch }) => {
//     try {
//       // The fetched data is available in `action.payload`
//       const fetchedCourses = action.payload;
//       // Map fetchedCourses to include the missing progress property
//       const courses = fetchedCourses.map((course) => ({
//         ...course,
//         progress: ProgressStatus.INCOMPLETE,
//       }));
//       // Dispatch setCourses with the mapped data
//       dispatch(setCourses(courses));
//     } catch (error) {
//       console.error('Error handling fulfilled getUserCourses action:', error);
//     }
//   },
  
// });


export default listenerMiddleware;