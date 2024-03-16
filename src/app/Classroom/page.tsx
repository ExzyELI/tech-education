"use client";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/app/firebase/init_app";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import Nav from "../../../comps/nav";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
}

// Function to generate a random 5-digit number
function generateClassCode(): string {
  const min = 10000;
  const max = 99999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

async function getStudents() {
  const q = query(collection(db, "users"), where("role", "==", "Student"));
  const students = await getDocs(q);
  return students.docs.map((doc) => {
    const data = doc.data();
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      id: doc.id,
    } satisfies Student;
  });
}

export default async function Home() {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [classCode, setClassCode] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const students = await getStudents();

  //useEffect(() => {
  //const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //// updating user state when auth state changes
  //setUser(user);

  //if (user) {
  //const firestore = getFirestore();

  //// reference to user document in Firestore
  //const userDocRef = doc(firestore, "users", user.uid);

  //// snapshot of user document
  //const userDocSnap = await getDoc(userDocRef);

  //if (userDocSnap.exists()) {
  //// user data is grabbed from snapshot if user document exists
  //const userData = userDocSnap.data();

  //setUserRole(userData.role);
  //}
  //}
  //});

  //return () => unsubscribe();
  // }, []);

  // Function to create a classroom collection with a random 5-digit class code
  async function createClassroom() {
    const code = generateClassCode();
    if (user && userRole === "Teacher") {
      // Only allow teachers to create classes
      await addDoc(collection(db, "classrooms"), { classCode: code });
      // Update the user's document with the class code
      await updateDoc(doc(db, "users", user.uid), {
        classCode: code,
      });
      setClassCode(code);
    }
    console.log(code);
  }

  return (
    <main className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      {/* banner begins */}
      <section className="border-b bg-[#ffecde]">
        <div className="px-6 pb-10 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <header className="flex w-full items-center justify-center py-3 font-serif text-5xl leading-normal tracking-normal">
              My Classroom
            </header>

            <div className="col-span-1 row-span-1 mb-10">
              <div className="flex items-center justify-center object-center">
                <img
                  className="h-[250px]"
                  src="https://i.imgur.com/1EDuUBO.png"
                />
              </div>

              <p className="text-center text-xs text-[#ff6865]">
                <a
                  href="https://www.vectorstock.com/royalty-free-vector/teacher-sitting-classroom-with-chalkboard-vector-43444042"
                  target="_blank"
                >
                  img source
                </a>
              </p>
            </div>

            {/* Beginning of main content */}
            <div className="min-h-screen rounded-md bg-white">
              {/* Information Bar */}
              <div className=" rounded-t-md bg-[#ff6865] shadow">
                {/* Placeholder for actual navigation content */}
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center py-4">
                    <button
                      className="mr-10 rounded-lg bg-[#afce8b] px-4 py-2 font-semibold text-white shadow-md hover:bg-[#ffe08d]"
                      onClick={createClassroom}
                    >
                      Create Class
                    </button>
                    <h2 className="text-lg font-semibold text-white">
                      Class ID: {classCode}
                    </h2>
                  </div>
                </div>
              </div>

              {/* section Content */}
              <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Actions Bar */}
                <div className="mb-6 flex justify-between">
                  <div className="flex space-x-4">
                    <button className="rounded-lg bg-[#ff6865] px-4 py-2 font-semibold text-white shadow-md hover:bg-[#ff9795]">
                      Add Student
                    </button>
                    <button className="rounded-lg bg-[#ff6865] px-4 py-2 font-semibold text-white shadow-md hover:bg-[#ff9795]">
                      Edit Class
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="rounded-lg border px-4 py-2"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-[#e1f3ff]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Student
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                M/F
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Printing
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Recording
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Accessibility
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Language
                              </th>
                              {/* <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Student ID
                              </th> */}
                              <th
                                scope="col"
                                className="tracking wider px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                              >
                                Academic Goal
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {students.map((student, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                }
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  {student.firstName + " " + student.lastName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  F
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  Off
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  Off
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  Off
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  English
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {student.id}
                                </td> */}
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  1 Academic Year
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* footer begins */}
      <footer className="sticky w-full bg-[#afce8b]">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-4 py-4">
          <span className="text-sm sm:text-center ">
            © 2024 Tech Education™
          </span>
        </div>
      </footer>
      {/* footer ends */}
    </main>
  );
}
