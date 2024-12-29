import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, selectUserId } from "./store/slices/auth"; // import your actions
import { UserRole } from "./sdk/types/index";
import { RootState } from "./store/store";
import {
  useGetCoursesQuery,
  useGetModulesQuery,
} from "./store/services/coreApi";
import {
  useGetCourseProgressQuery,
  useGetModuleProgressQuery,
  useUpdateCourseProgressMutation,
  useUpdateModuleProgressMutation,
} from "./store/services/activityApi";
import { ProgressStatus } from "./store/services/sdk";
import { CourseViewState, selectCurrentCourse } from "./store/slices/courseViewSlice";

interface CourseProgressProps {
  courseInstanceId: string;
}

interface ModuleProgressProps {
  moduleId: string;
}



const CourseProgress: React.FC<CourseProgressProps> = ({
  courseInstanceId,
}) => {
  // Fetch the progress of a specific course instance for the given user.
  // The query is skipped if the `courseInstanceId` is not provided.
  const userId = useSelector(selectUserId);
  const {
    data: progress,
    isLoading,
    isError,
  } = useGetCourseProgressQuery(
    { userId: userId || "", courseInstanceId },
    {
      skip: !courseInstanceId && !userId, // Prevent unnecessary fetches when courseInstanceId is missing
    }
  );

  // Mutation to update the progress of a specific course instance for the given user.
  // This function is used to trigger the progress update.
  const [updateCourseProgress, { isLoading: isUpdating }] =
    useUpdateCourseProgressMutation();

  const handleUpdateProgress = async () => {
    if (userId && courseInstanceId){
      await updateCourseProgress({
        userId: userId, // The user ID associated with the course
        courseInstanceId, // The course instance ID to update progress for
      });
    }
  };

  // Display a loading indicator while fetching the progress.
  if (isLoading) return <span>Loading...</span>;

  // Display an error message if there was an issue fetching the progress.
  if (isError) return <span>Error</span>;

  return (
    <div>
      {/* Display the current progress or a fallback message if no progress data is available */}
      <span>{progress || "No Progress Data"}</span>

      {/* Button to update the course progress */}
      <button
        onClick={handleUpdateProgress}
        disabled={isUpdating} // Disable the button while the update is in progress
        style={{ marginLeft: "10px" }}
      >
        {isUpdating ? "Updating..." : "Update Progress"}{" "}
        {/* Dynamic button text based on update status */}
      </button>
    </div>
  );
};

const ModuleProgress: React.FC<ModuleProgressProps> = ({ moduleId }) => {
  // Fetch the progress of a specific module for the given user.
  // The query is skipped if the `moduleId` is not provided.
  const userId = useSelector(selectUserId);
  const currentCourse = useSelector(selectCurrentCourse);

  const {
    data: progress,
    isLoading,
    isError,
  } = useGetModuleProgressQuery(
    { userId: userId || "", courseInstanceId: currentCourse?.courseInstanceId || "", moduleId },
    {
      skip: !moduleId && !userId, // Prevent unnecessary fetches when moduleId is missing
    }
  );

  // Mutation to update the progress of a specific module for the given user.
  // This function is used to trigger the progress update.
  const [updateModuleProgress, { isLoading: isUpdating }] =
    useUpdateModuleProgressMutation();
  
  const handleUpdateProgress = async () => {
    if (userId && currentCourse?.courseInstanceId && moduleId){
      await updateModuleProgress({
        userId: userId, // The user ID associated with the module
        courseInstanceId: currentCourse.courseInstanceId, // The course instance ID associated with the module
        moduleId, // The module ID to update progress for
      });
    }
  };

  
  return (
    <div>
      {/* Display the current progress or a fallback message if no progress data is available */}
      <span>{progress || "No Progress Data"}</span>

      {/* Button to update the course progress */}
      <button
        onClick={handleUpdateProgress}
        disabled={isUpdating} // Disable the button while the update is in progress
        style={{ marginLeft: "10px" }}
      >
        {isUpdating ? "Updating..." : "Update Progress"}{" "}
        {/* Dynamic button text based on update status */}
      </button>
    </div>
  );
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const currentCourse = useSelector(selectCurrentCourse);
  const userId = useSelector(selectUserId);


  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery(
    { userId: userId || "" },
    {
      skip: !userId, // Skip query if userId is not available
    }
  );

  const {
    data: modules,
    isLoading: modulesLoading,
    isError: modulesError,
  } = useGetModulesQuery(
    { courseId: currentCourse?.courseId || "" },
    {
      skip: !currentCourse?.courseId, // Skip query if courseId is not available
    }
  );

  const handleLogin = () => {
    const dummyUser = {
      userId: "user-123",
      userName: "John Doe",
      role: UserRole.STUDENT,
      email: "john@gmail.com",
    };
    dispatch(setUser(dummyUser));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>

      {/* User Info */}
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

      {/* Courses Table */}
      <div>
        <h1>Courses</h1>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : isError ? (
          <p>Failed to load courses.</p>
        ) : (
          <table
            border={1}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Instance ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.courseInstanceId}</td>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>
                    {authUser?.userId && (
                      <CourseProgress
                        courseInstanceId={course.courseInstanceId}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modules Table */}
      <div>
        <h1>Modules</h1>
        <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Module ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Sequence</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {modulesLoading ? (
              <tr>
                <td colSpan={4}>Loading modules...</td>
              </tr>
            ) : modulesError ? (
              <tr>
                <td colSpan={4}>Failed to load modules.</td>
              </tr>
            ) : (
              modules?.map((module) => (
                <tr key={module.moduleId}>
                  <td>{module.moduleId}</td>
                  <td>{module.title}</td>
                  <td>{module.description}</td>
                  <td>{module.sequence}</td>
                  <td>
                    {authUser?.userId && (
                      <ModuleProgress moduleId={module.moduleId} />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
