"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init_app";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Charts from "./charts";
import SearchFilter from "./search-filter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// define activity data
interface Activity {
  activityName: string;
  score: number;
}

// define component
const ReportsPage = () => {
  // define state variables
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [studentCode, setStudentCode] = useState<string>("");
  const [hasCode, setHasCode] = useState<boolean>(false);
  const [activityData, setActivityData] = useState<Activity[]>([]);
  const [filteredActivityData, setFilteredActivityData] = useState<Activity[]>(
    [],
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      // if user is authenticated, fetch activity data
      if (user) {
        const firestore = getFirestore();

        // reference to user document in Firestore
        const userDocRef = doc(firestore, "users", user.uid);

        // snapshot of user document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // user data is grabbed from snapshot if user document exists
          const userData = userDocSnap.data();
          console.log(userData.studentCode);
          if (userData.studentCode) {
            setHasCode(true);

            const q = query(
              collection(firestore, "users"),
              where("role", "==", "Student"),
              where("studentCode", "==", userData.studentCode),
            );
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.size);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0]; // Get the first document from the query results
              const userId = userDoc.id; // Extract the UID of the user
              fetchActivity(userId);
              console.log("Hi");
            }
          }
        }
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

  async function handleAddStudent() {
    setUser(user);

    if (user) {
      // Check the database for the studentCode that was input by the parent,
      // and if the code is found, add the studentCode to that Parent user information
      const firestore = getFirestore();
      const q = query(
        collection(firestore, "users"),
        where("role", "==", "Student"),
        where("studentCode", "==", studentCode),
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.size);
      // error if the student code or classCode does not exist
      if (querySnapshot.empty) {
        // Validate input fields
        console.error("Student code or class code is missing.");
        toast.error("Student code does not exist!");
        return;
      }
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first document from the query results
        const userId = userDoc.id; // Extract the UID of the user
        fetchActivity(userId);
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, { studentCode });
        console.log(studentCode);
        console.log("Student added successfully!");
        toast.success("Student added successfully!");
      }
    }
  }

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
              maxLength={5}
            />
            <button
              type="submit"
              onClick={handleAddStudent}
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
      <ToastContainer
        className="Toast-position mt-[70px]"
        style={{ width: "450px" }}
        position="top-center"
      />
    </main>
  );
};

export default ReportsPage;
