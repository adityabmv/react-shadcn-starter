import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, selectUserId } from "./store/slices/auth"; // import your actions
import { UserRole } from "./sdk/types/index";
import { AppDispatch, RootState } from "./store/store";
import {
  useGetCoursesQuery,
  useGetModulesQuery,
} from "./store/services/coreApi";
import { useGetCourseProgressQuery } from "./store/services/activityApi";

interface CourseProgressProps {
  courseInstanceId: string;
}

interface ModuleProgressProps {
  moduleId: string;
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
