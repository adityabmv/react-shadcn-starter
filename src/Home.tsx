import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from './store/slices/auth'; // import your actions
import { User, UserRole } from './sdk/types/index';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useGetUserCoursesQuery } from './store/services/courseServceApi';
import { setCourses } from './store/slices/courseViewSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    const dummyUser: User = {
      userId: 'user-123',
      userName: 'John Doe',
      role: UserRole.STUDENT,
      email: 'john@gmail.com',
    };

    // Dispatch the action to set the user
    dispatch(setUser(dummyUser));
    const { data: courses, isFetching, error } = useGetUserCoursesQuery(authUser?.userId ?? '', {
      skip: !authUser, // Skip fetching if no user is authenticated
    });
  };

  const handleLogout = () => {
    // Dispatch the action to logout the user
    dispatch(logout());
  };


  const authUser = useSelector((state: RootState) => state.auth.user);
  const { data: courses, isFetching, error } = useGetUserCoursesQuery(authUser?.userId ?? '', {
    skip: !authUser, // Skip fetching if no user is authenticated
  });

  useEffect(() => {
    if (courses){
      dispatch(setCourses(courses));
      
    }}
  );

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {authUser ? (
          <div>
            <h2>User Info</h2>
            <p>Username: {authUser.userName}</p>
            <p>Email: {authUser.email}</p>
            <p>Role: {authUser.role}</p>
          </div>
        ) : (
          <p>User not logged in</p>
        )}
      </div>
      <div>
        {isFetching ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error</p>
        ) : courses ? (
          <div>
            <h2>Courses</h2>
            <ul>
              {courses.map((course) => (
                <li key={course.courseId}>{course.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No courses found</p>
        )}
        </div>
    </div>
  );
};

export default Home;