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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../comps/footer";

export default function ClassPage() {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [classCode, setClassCode] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [codeExists, setCodeExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
          }
          setUserRole(userData.role);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const firestore = getFirestore();
        const usersRef = collection(firestore, "users");

        // Query users with the role "Teacher" and the specified class code
        const q = query(
          usersRef,
          where("role", "==", "Teacher"),
          where("classCode", "==", classCode),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // At least one user with the specified role and class code exists
          console.log("User(s) with role 'Teacher' and class code:", classCode);

          await updateDoc(doc(db, "users", user.uid), {
            classCode: classCode,
          });
          console.log("Done");
        } else {
          // No user with the specified role and class code exists
          console.log("No user with role 'Teacher' and class code:", classCode);
        }
      } catch (error) {
        console.error("Error checking class code:", error);
      }
    }
  };

  return (
    <div>
      <title>Class Page</title>
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}
      <div className="flex min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#FAF9F6] text-[#434343]">
        {/* container */}
        <div className="mx-auto my-auto flex w-1/4 max-w-sm rounded-lg bg-white shadow-lg lg:max-w-4xl">
          <div className="relative w-full px-6 py-10 md:px-8">
            <button
              onClick={() => router.push("/HomePage")}
              className="absolute left-0 top-0 ml-4 mt-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            </button>
            <p className="mt-2 text-center text-xl font-bold text-[#ff6865]">
              Add your class!
            </p>

            {/* Form for classroom code */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleForm}>
                {/* Class code slot */}
                <div>
                  <label
                    htmlFor="Class Code"
                    className="mb-2 block text-sm font-medium"
                  >
                    Class Code
                  </label>
                  <input
                    id="Class Code"
                    name="Class Code"
                    type="text"
                    placeholder="5-Digit Code"
                    maxLength={5}
                    required
                    onChange={(e) => setClassCode(e.target.value)}
                    className="block w-full rounded-lg border bg-white px-4 py-2 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-40"
                  />
                </div>

                {/* sign in button */}
                <div>
                  <button
                    type="submit"
                    className="w-full transform rounded-lg bg-[#ffe08d] px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-[#ffe9b0] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer
              className="Toast-position mt-[20px]"
              style={{ width: "450px" }}
              position="top-center"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
