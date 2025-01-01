import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, selectUserId } from "./store/slices/auth"; // import your actions
import { UserRole } from "./sdk/types/index";
import { AppDispatch, RootState } from "./store/store";
import {
  useGetCoursesQuery,
  useGetModulesQuery,
} from "./store/services/coreApi";
// import {
//   activityApi,
//   useGetCourseProgressQuery,
//   useGetModuleProgressQuery,
//   useGetProgressQuery,
//   useUpdateCourseProgressMutation,
//   useUpdateModuleProgressMutation,
// } from "./store/services/activityApi";
import { ProgressStatus } from "./store/services/sdk";
import { CourseViewState, selectCurrentCourse } from "./store/slices/courseViewSlice";
import { useGetCourseProgressQuery } from "./store/services/activityApi";

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
  const [studentId, setStudentId] = useState('');
  const [courseInstanceId, setCourseInstanceId] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);

  const { data, error, isLoading } = useGetCourseProgressQuery(
      { studentId, courseInstanceId },
      { skip: !triggerFetch } // Skip query until user triggers fetch
  );

  const handleFetchProgress = () => {
      if (studentId && courseInstanceId) {
          setTriggerFetch(true);
      } else {
          alert('Please provide both student ID and course instance ID.');
      }
  };

  return (
      <div>
          <h1>Test getProgress Query</h1>
          <div>
              <label>
                  Student ID:
                  <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Enter student ID"
                  />
              </label>
          </div>
          <div>
              <label>
                  Course Instance ID:
                  <input
                      type="text"
                      value={courseInstanceId}
                      onChange={(e) => setCourseInstanceId(e.target.value)}
                      placeholder="Enter course instance ID"
                  />
              </label>
          </div>
          <button onClick={handleFetchProgress}>Fetch Progress</button>

          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching data: {JSON.stringify(error)}</p>}
          {data && (
              <div>
                  <h2>Progress Data:</h2>
                  <pre>Course Progress is : {data.progress}</pre>
              </div>
          )}
      </div>
  );
};
export default Home;
