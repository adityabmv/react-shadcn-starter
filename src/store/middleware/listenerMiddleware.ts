import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setUser } from '../slices/auth';
import { setCourses } from '../slices/courseViewSlice';
import { courseApi } from '../services/courseServceApi';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action, { dispatch, fork }) => {
    const userId = action.payload.userId;

    // Start the forked task
    const task = fork(async () =>
      dispatch(courseApi.endpoints.getUserCourses.initiate(userId)).unwrap()
    );

    // Await the result of the forked task
    const result = await task.result;

    if (result.status === 'ok') {
      // Dispatch setCourses with the fetched data
      dispatch(setCourses(result.value));
    } else {
      console.error('Failed to fetch courses:', result.error);
    }
  },
});

export default listenerMiddleware;