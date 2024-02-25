"use client";
import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { auth } from "../firebase/init_app";

const GradesPage = () => {
  const [user, setUser] = useState<User | null>(null); // setting user as User
  const [grades, setGrades] = useState<any[]>([]); // setting fetchedGrades as any[]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchGrades(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchGrades = async (userId: string) => {
    try {
      const firestore = getFirestore();
      const gradesRef = collection(firestore, `users/${userId}/activities`);
      const q = query(gradesRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedGrades: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedGrades.push(doc.data());
      });

      setGrades(fetchedGrades);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#ffecde] font-serif text-[#2d2d2d]">
      <title>Grades</title>
      <Nav />
      <div className="mx-auto my-10 max-w-full flex-grow px-2 py-4 sm:px-4 md:px-8">
        <div className="w-full max-w-7xl overflow-x-auto">
          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            {grades.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#ff6865]">
                  <tr>
                    <th className="whitespace-nowrap px-2 py-2 text-left text-lg font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-4 md:px-8 md:text-xl">
                      Activity
                    </th>
                    <th className="whitespace-nowrap px-2 py-2 text-left text-lg font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-4 md:px-8 md:text-xl">
                      Score
                    </th>
                    <th className="whitespace-nowrap px-2 py-2 text-left text-lg font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-4 md:px-8 md:text-xl">
                      Time
                    </th>
                    <th className="whitespace-nowrap px-2 py-2 text-left text-lg font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-4 md:px-8 md:text-xl">
                      Attempt #
                    </th>
                    <th className="whitespace-nowrap px-2 py-2 text-left text-lg font-semibold uppercase tracking-wider text-white sm:px-4 sm:py-4 md:px-8 md:text-xl">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {grades.map((grade, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-[#fff7f7]" : "bg-white"}
                    >
                      <td className="whitespace-nowrap px-2 py-2 text-lg font-semibold text-gray-900 sm:px-4 sm:py-4 md:px-8 md:text-xl">
                        {grade.activityName}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-lg text-gray-500 sm:px-4 sm:py-4 md:px-8 md:text-xl">
                        {grade.score}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-lg text-gray-500 sm:px-4 sm:py-4 md:px-8 md:text-xl">
                        {grade.elapsedTime}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-lg text-gray-500 sm:px-4 sm:py-4 md:px-8 md:text-xl">
                        {grade.attempts}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-lg text-gray-500 sm:px-4 sm:py-4 md:px-8 md:text-xl">
                        {grade.timestamp
                          ? grade.timestamp.toDate().toLocaleString()
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-lg text-[#ff6865]">
                No grades available
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default GradesPage;
