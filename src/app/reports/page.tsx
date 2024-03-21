"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init_app";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
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
        <div className="mx-auto w-2/4">
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
      <Footer />
    </main>
  );
};

export default ReportsPage;
