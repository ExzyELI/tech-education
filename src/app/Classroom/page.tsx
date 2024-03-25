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
  deleteField,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase/init_app";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  grade: string;
  studentCode: string;
}

// Function to generate a random 5-digit number
function generateClassCode(): string {
  const min = 10000;
  const max = 99999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [classCode, setClassCode] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [codeExists, setCodeExists] = useState(false);
  const [addStudents, setAddStudents] = useState(false);
  const [studentCode, setStudentCode] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editClass, setEditClass] = useState(false);

  useEffect(() => {
    const fetchUser = auth.onAuthStateChanged(async (user) => {
      // updating user state when auth state changes
      setUser(user);

      if (user) {
        const firestore = getFirestore();

        // reference to user document in Firestore
        const userDocRef = doc(firestore, "users", user.uid);

        // snapshot of user document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // user data is grabbed from snapshot if user document exists
          const userData = userDocSnap.data();

          if (userData.classCode) {
            console.log("Class code already exists:", userData.classCode);
            setClassCode(userData.classCode);
            setCodeExists(true);
            const q = query(
              collection(db, "users"),
              where("role", "==", "Student"),
              where("classCode", "==", userData.classCode),
            );
            const querySnapshot = await getDocs(q);
            const studentData = querySnapshot.docs.map((doc) => ({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
              role: doc.data().role,
              id: doc.id,
              grade: doc.data().grade,
              studentCode: doc.data().studentCode,
            }));
            setStudents(studentData);
            setFilteredStudents(studentData);
            console.log("Gottem");
          }
          setUserRole(userData.role);
        }
      }
    });

    // const getStudents = async () => {
    //   try {
    //     const q = query(
    //       collection(db, "users"),
    //       where("role", "==", "Student"),
    //       where("classCode", "==", classCode),
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const studentData = querySnapshot.docs.map((doc) => ({
    //       firstName: doc.data().firstName,
    //       lastName: doc.data().lastName,
    //       email: doc.data().email,
    //       role: doc.data().role,
    //       id: doc.id,
    //     }));
    //     setStudents(studentData);
    //     console.log("Gottem");
    //     console.log(userData.classCode);
    //   } catch (error) {
    //     console.error("Error fetching students:", error);
    //   }
    // };

    return () => {
      fetchUser();
    };
  }, []);

  function handleStudents() {
    setAddStudents((prevState) => !prevState);
  }

  function handleClassEdit() {
    setEditClass((prevState) => !prevState);
  }

  async function handleDeleteClass() {
    // Function that deletes the classCode field for every Student that has this classCode and the Teacher that has the classCode
    try {
      if (user) {
        // Update the teacher's document to delete the classCode
        const teacherDocRef = doc(db, "users", user.uid); // Replace teacherId with the actual ID of the teacher
        await updateDoc(teacherDocRef, { classCode: deleteField() });

        // Query students with the same classCode and update their documents
        const studentQuery = query(
          collection(db, "users"),
          where("role", "==", "Student"),
          where("classCode", "==", classCode),
        );
        const querySnapshot = await getDocs(studentQuery);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
          const studentDocRef = doc.ref;
          batch.update(studentDocRef, { classCode: deleteField() });
        });

        // Commit the batched updates
        await batch.commit();

        console.log("Class deleted successfully!");
        //toast.success("Class deleted successfully!");
        // Adding a delay between the page reload and the toast message
        //setTimeout(() => {
        location.reload();
        //}, 1000);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  function handleEdit(index: number) {
    if (editIndex === index) {
      // If the edit button is clicked again on the same row, hide the remove button
      setEditIndex(null);
    } else {
      setEditIndex(index); // Set the editIndex state to the index of the row being edited
    }
  }

  async function handleDelete(index: number, userId: string) {
    const firestore = getFirestore();
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, { classCode: deleteField() });
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log(userData.classCode);
    }
    location.reload();
  }

  async function handleAddStudent() {
    //e.preventDefault();
    // Want to check the database for the studentCode that was input by the teacher,
    // and if the code is found, add the classCode to that student users information
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
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { classCode });
      console.log(classCode);
      console.log("Student added successfully!");
      //toast.success("Student added successfully!");
    }
    location.reload();
  }
  // Function to create a classroom collection with a random 5-digit class code
  async function createClassroom() {
    const code = generateClassCode();
    // If statement only allowing teachers to create classes
    if (user && userRole === "Teacher") {
      // Update the user's document with the class code
      await updateDoc(doc(db, "users", user.uid), {
        classCode: code,
      });
      setClassCode(code);
      setCodeExists(true);
    }
    console.log(code);
  }

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert search query to lowercase
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter students based on the search query
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query),
    );
    setFilteredStudents(filtered);
  };

  return (
    <main className="font-family: font-sans leading-normal tracking-normal text-[#132241]">
      <title>Classroom Page</title>
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      {/* banner begins */}
      <section className="border-b bg-[#FAF9F6]">
        <div className="px-6 pb-10 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto pt-10 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            {/* Beginning of main content */}
            <div className="min-h-screen rounded-md bg-white">
              {/* Information Bar */}
              <div className=" rounded-t-md bg-[#87CEEB] shadow">
                {/* Placeholder for actual navigation content */}
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center py-4">
                    <button
                      className={`mr-10 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:bg-indigo-900 ${codeExists ? "hidden" : ""} `}
                      onClick={createClassroom}
                    >
                      Create Class
                    </button>
                    <h2
                      className={`text-lg font-semibold text-white ${!codeExists ? "hidden" : ""} `}
                    >
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
                    <button
                      className={`rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:bg-indigo-900 ${!codeExists ? "hidden" : ""} `}
                      onClick={handleStudents}
                    >
                      Add Student
                    </button>
                    <input
                      type="text"
                      placeholder="Add Student Code..."
                      onChange={(e) => setStudentCode(e.target.value)}
                      maxLength={5}
                      className={`rounded-lg border px-4 py-2 ${!addStudents ? "hidden" : ""} `}
                    />
                    <button
                      type="submit"
                      className={`ml-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:bg-indigo-900 ${!addStudents ? "hidden" : ""} `}
                      onClick={handleAddStudent}
                    >
                      Add
                    </button>
                    <button
                      className={`rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:bg-indigo-900 ${!codeExists ? "hidden" : ""} `}
                      onClick={handleClassEdit}
                    >
                      Edit Class
                    </button>
                    <button
                      className={`ml-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-md hover:scale-110 hover:bg-red-900 ${!editClass ? "hidden" : ""} `}
                      onClick={handleDeleteClass}
                    >
                      Delete Class
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      className={`rounded-lg border px-4 py-2 ${!codeExists ? "hidden" : ""} `}
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-[#87CEEB]">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                              >
                                Student
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                              >
                                M/F
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
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
                                className="tracking wider px-6 py-3 text-left text-xs font-medium uppercase text-white"
                              >
                                Grade
                              </th>
                              <th
                                scope="col"
                                className="tracking wider px-6 py-3 text-left text-xs font-medium uppercase text-white"
                              >
                                Code
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredStudents.map((student, index) => (
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
                                  M
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {student.role}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  English
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {student.id}
                                </td> */}
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {student.grade}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {student.studentCode}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                                  <button
                                    className="mx-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:scale-110 hover:bg-indigo-900"
                                    onClick={() => handleEdit(index)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className={`mx-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow hover:scale-110 hover:bg-red-900 ${editIndex === index ? "" : "hidden"}`}
                                    onClick={() =>
                                      handleDelete(index, student.id)
                                    }
                                  >
                                    Remove
                                  </button>
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
      <Footer />
      {/* footer ends */}
      <ToastContainer
        className="Toast-position mt-[70px]"
        style={{ width: "450px" }}
        position="top-center"
      />
    </main>
  );
}
