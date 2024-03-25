"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init_app";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Charts from "./charts";
import SearchFilter from "./search-filter";

// define activity data
interface Activity {
  activityName: string;
  score: number;
}

// define component
const ReportsPage = () => {
  // define state variables
  const [studentCode, setStudentCode] = useState<string>("");
  const [activityData, setActivityData] = useState<Activity[]>([]);
  const [filteredActivityData, setFilteredActivityData] = useState<Activity[]>(
    [],
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if user is authenticated, fetch activity data
      if (user) {
        fetchActivity(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // fetch activity data from firestore
  const fetchActivity = async (userId: string) => {
    try {
      const firestore = getFirestore(); // firestore instance
      const activityRef = collection(firestore, `users/${userId}/activities`); // user's activity collection
      const q = query(activityRef); // get all documents from activity collection
      const querySnapshot = await getDocs(q); // get snapshot of the query
      const activities: Activity[] = []; // store the activities in array

      querySnapshot.forEach((doc) => {
        activities.push(doc.data() as Activity); // push data to array
      });

      setActivityData(activities);
    } catch (error) {
      console.error("Error fetching activity:", error); // error log
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-[#2d2d2d]">
      <Nav />
      <div className="container relative mx-auto my-10 flex-grow px-4 md:flex md:justify-center md:px-8">
        <div className="w-2/4">
          <div className="mx-auto mb-2 flex w-full items-center overflow-hidden rounded-md border border-gray-200 bg-white">
            <input
              type="search"
              className="block w-full bg-white px-4 py-2 text-gray-700 focus:outline-none"
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="Add student code..."
            />
            <button
              type="submit"
              className="bg-white px-4 py-2 text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="mx-auto w-full">
            {/* search and filter */}
            <SearchFilter
              activityData={activityData}
              setFilteredActivityData={setFilteredActivityData}
            />
            <div className="z-0 mt-4">
              {/* charts */}
              <Charts activityData={filteredActivityData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ReportsPage;
