import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/init_app";

interface FiltersProps {
  setFilteredGrades: React.Dispatch<React.SetStateAction<any[]>>;
}

const Filters: React.FC<FiltersProps> = ({ setFilteredGrades }) => {
  const [user] = useAuthState(auth);
  const [sortBy, setSortBy] = useState<string>("descScore");
  const [activityNames, setActivityNames] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [selectedScoreFilter, setSelectedScoreFilter] = useState<string>("");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>("");

  useEffect(() => {
    fetchActivityNames();
  }, []);

  const fetchActivityNames = async () => {
    try {
      if (user) {
        const firestore = getFirestore();
        const gradesRef = collection(firestore, `users/${user.uid}/activities`);
        const q = query(gradesRef);
        const querySnapshot = await getDocs(q);
        const names: string[] = [];
        querySnapshot.forEach((doc) => {
          const { activityName } = doc.data();
          if (!names.includes(activityName)) {
            names.push(activityName);
          }
        });
        setActivityNames(names);
      }
    } catch (error) {
      console.error("Error fetching activity names:", error);
    }
  };

  const applyFilters = () => {
    if (!user) return;

    try {
      const firestore = getFirestore();
      const gradesRef = collection(firestore, `users/${user.uid}/activities`);
      let filteredGrades: any[] = [];

      getDocs(gradesRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const grade = doc.data();

          if (
            selectedActivity !== "" &&
            grade.activityName !== selectedActivity
          ) {
            return;
          }

          if (selectedScoreFilter === "highest-score") {
            filteredGrades.push(grade);
          } else if (selectedScoreFilter === "lowest-score") {
            filteredGrades.unshift(grade);
          }

          if (selectedTimeFilter === "fastest-time-taken") {
            filteredGrades.push(grade);
          } else if (selectedTimeFilter === "slowest-time-taken") {
            filteredGrades.unshift(grade);
          }
        });

        if (selectedScoreFilter === "highest-score") {
          filteredGrades.sort((a, b) => b.score - a.score);
        } else if (selectedScoreFilter === "lowest-score") {
          filteredGrades.sort((a, b) => a.score - b.score);
        }

        if (selectedTimeFilter === "fastest-time-taken") {
          filteredGrades.sort((a, b) => a.elapsedTime - b.elapsedTime);
        } else if (selectedTimeFilter === "slowest-time-taken") {
          filteredGrades.sort((a, b) => b.elapsedTime - a.elapsedTime);
        }

        setFilteredGrades(filteredGrades);
      });
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [user, setFilteredGrades]);

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };

  const clearFilters = () => {
    setSortBy("descScore");
    applyFilters();
  };

  return (
    <div className="filters-container mx-auto w-full max-w-xs">
      <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold">Activity</h4>
          <select
            value={sortBy}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="descScore">Select Activity</option>
            {activityNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold">Score</h4>
          <div className="mb-5 flex items-start justify-between">
            <input
              id="highest-score"
              type="radio"
              value="highest-score"
              name="filter-score"
              onChange={() => handleFilterChange("highest-score")}
              className="sr-only"
            />
            <label
              htmlFor="highest-score"
              className="me-4 cursor-pointer rounded-lg border border-gray-300 bg-blue-200 px-4 py-2 text-center text-sm font-medium text-blue-800 transition-colors duration-300 hover:border-blue-600 hover:bg-blue-200"
              style={{ width: "140px" }}
            >
              Highest
            </label>
            <input
              id="lowest-score"
              type="radio"
              value="lowest-score"
              name="filter-score"
              onChange={() => handleFilterChange("lowest-score")}
              className="sr-only"
            />
            <label
              htmlFor="lowest-score"
              className="me-4 cursor-pointer rounded-lg border border-gray-300 bg-blue-200 px-4 py-2 text-center text-sm font-medium text-blue-800 transition-colors duration-300 hover:border-blue-600 hover:bg-blue-200"
              style={{ width: "140px" }}
            >
              Lowest
            </label>
          </div>

          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold">Time</h4>
            <div className="flex items-center">
              <input
                type="radio"
                id="fastest-time-taken"
                name="filter-time-taken"
                value="fastest-time-taken"
                onChange={() => handleFilterChange("fastest-time-taken")}
                className="hidden"
              />
              <label
                htmlFor="fastest-time-taken"
                className="me-4 cursor-pointer rounded-lg border border-gray-300 bg-blue-200 px-4 py-2 text-center text-sm font-medium text-blue-800 transition-colors duration-300 hover:border-blue-600 hover:bg-blue-200"
                style={{ width: "140px" }}
              >
                Fastest
              </label>
              <input
                type="radio"
                id="slowest-time-taken"
                name="filter-time-taken"
                value="slowest-time-taken"
                onChange={() => handleFilterChange("slowest-time-taken")}
                className="hidden"
              />
              <label
                htmlFor="slowest-time-taken"
                className="me-4 cursor-pointer rounded-lg border border-gray-300 bg-blue-200 px-4 py-2 text-center text-sm font-medium text-blue-800 transition-colors duration-300 hover:border-blue-600 hover:bg-blue-200"
                style={{ width: "140px" }}
              >
                Slowest
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="w-1/2 rounded-md bg-blue-400 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Apply Filters
          </button>
          <button className="w-1/2 rounded-md bg-red-400 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
