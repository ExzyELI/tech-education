"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Charts from "./charts";

interface Activity {
  activityName: string;
  score: number;
}

const ReportsPage = () => {
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [activityData, setActivityData] = useState<Activity[]>([]); // store activity data

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
      if (user) {
        fetchActivity(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchActivity = async (userId: string) => {
    try {
      const firestore = getFirestore();
      const activityRef = collection(firestore, `users/${userId}/activities`);
      const q = query(activityRef);
      const querySnapshot = await getDocs(q);
      const activities: Activity[] = [];
      querySnapshot.forEach((doc) => {
        activities.push(doc.data() as Activity);
      });
      setActivityData(activities);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const createDonutCharts = () => {
    const activityGroups: { [key: string]: Activity[] } = {};
    activityData.forEach((activity) => {
      if (!activityGroups[activity.activityName]) {
        activityGroups[activity.activityName] = [];
      }
      activityGroups[activity.activityName].push(activity);
    });

    const donutCharts: JSX.Element[] = [];
    for (const activityName in activityGroups) {
      if (Object.prototype.hasOwnProperty.call(activityGroups, activityName)) {
        const activityData = activityGroups[activityName];
        const scores = activityData.map((activity) => activity.score);
        const highestScore = Math.max(...scores);
        const lowestScore = Math.min(...scores);
        const averageScore =
          scores.reduce((acc, score) => acc + score, 0) / scores.length;

        donutCharts.push(
          <Charts
            key={activityName}
            activityName={activityName}
            highestScore={highestScore}
            lowestScore={lowestScore}
            averageScore={averageScore}
          />,
        );
      }
    }

    return donutCharts;
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-[#2d2d2d]">
      <Nav />
      <div className="container mx-auto my-10 flex-grow px-4 md:flex md:justify-center md:px-8">
        <div className="w-full max-w-xl">{createDonutCharts()}</div>
      </div>
      <Footer />
    </main>
  );
};

export default ReportsPage;
