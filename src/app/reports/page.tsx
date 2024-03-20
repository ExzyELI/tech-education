"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
// npm install react-chartjs-2 chart.js
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

interface Activity {
  score: number;
}

const ReportsPage = () => {
  const [user, setUser] = useState<User | null>(null); // store logged in user
  const [activityData, setActivityData] = useState<Activity[]>([]); // store activity data

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // update the user state when auth state changes
      if (user) {
        // get most recent user activity
        //getRecentActivity(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const firestore = getFirestore();
        const activityQuery = query(
          collection(firestore, `users/${user.uid}/activities`),
          orderBy("score", "desc"),
        );
        const querySnapshot = await getDocs(activityQuery);
        const activities: Activity[] = [];
        querySnapshot.forEach((doc) => {
          activities.push(doc.data() as Activity);
        });
        setActivityData(activities);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (activityData.length > 0) {
      // calculate highest score
      const highestScore = activityData[0].score;

      // calculate lowest score
      const lowestScore = activityData[activityData.length - 1].score;

      // calculate average score
      const totalScore = activityData.reduce(
        (acc, curr) => acc + curr.score,
        0,
      );
      const averageScore = totalScore / activityData.length;

      console.log("Highest Score:", highestScore);
      console.log("Lowest Score:", lowestScore);
      console.log("Average Score:", averageScore);
    }
  }, [activityData]);

  const highestScore = 10; // placeholder values
  const lowestScore = 20;
  const averageScore = 30;
  const numAttempts = 40;

  const data = {
    labels: [
      "Highest Score",
      "Lowest Score",
      "Average Score",
      "Number of Attempts",
    ],
    datasets: [
      {
        data: [highestScore, lowestScore, averageScore, numAttempts],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-[#2d2d2d]">
      <title>Tech Education</title>
      <Nav />
      <div className="mx-auto mt-10 w-full max-w-3xl flex-grow px-4 py-8 md:flex md:justify-center md:px-8">
        <div>
          <div className="flex justify-center">
            <div>
              <div className="flex justify-center">
                <Pie data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ReportsPage;
