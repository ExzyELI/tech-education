import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { User } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

// Define student data
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentCode: string;
}

// Define props
interface StudentFilterProps {
  user: User | null;
  handleSearch: Function;
}

// Define component
const StudentFilter: React.FC<StudentFilterProps> = ({
  user,
  handleSearch,
}) => {
  // Define state variables
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [studentOptions, setStudentOptions] = useState<Student[]>([]);
  const [selectedStudentData, setSelectedStudentData] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const [hasClass, setHasClass] = useState<boolean>(false);

  // Fetch students based on the teacher's class code
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (user) {
          const firestore = getFirestore();
          // Reference to user document in Firestore
          const userDocRef = doc(firestore, "users", user.uid);

          // Snapshot of user document
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // User data is grabbed from snapshot if user document exists
            const userData = userDocSnap.data();
            setRole(userData.role);

            if (userData.classCode) {
              setHasClass(true);
              console.log("Classroom exists", userData.classCode);
              // Set state for classroom existing

              const q = query(
                collection(firestore, "users"),
                where("role", "==", "Student"),
                where("classCode", "==", userData.classCode),
              );
              const querySnapshot = await getDocs(q);
              const students: Student[] = [];

              querySnapshot.forEach((doc) => {
                students.push(doc.data() as Student);
              });

              setStudentOptions(students);
            }
            if (!userData.classCode) {
              setHasClass(false);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [user]);

  // Toggle filter dropdown
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Select student from filter dropdown
  const selectStudent = (student: Student) => {
    setSearchQuery(`${student.firstName} ${student.lastName}`);
    setFilterOpen(false);
    setSelectedStudentData(student.studentCode);
  };

  // Render filter dropdown options
  const filterOptions = () => {
    return studentOptions.map((student) => (
      <li key={student.id}>
        <button
          type="button"
          onClick={() => selectStudent(student)}
          className="block w-full px-4 py-2 text-left hover:bg-blue-200 focus:bg-blue-200 focus:outline-none"
        >
          {`${student.firstName} ${student.lastName}`}
        </button>
      </li>
    ));
  };

  // Return the studentCode after searching
  function handleClick() {
    handleSearch(selectedStudentData);
  }

  return (
    <div className="relative z-50 mb-4">
      <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white">
        <button
          onClick={toggleFilter}
          className="bg-blue-200 px-4 py-2 text-gray-700 hover:bg-blue-300 focus:outline-none"
          type="button"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        {!hasClass ? (
          <input
            type="text"
            readOnly
            value="Create a class on the classroom page first!"
            className="block w-full bg-white px-4 py-2 text-gray-700 focus:outline-none"
            required
          />
        ) : (
          <input
            type="text"
            readOnly
            onClick={toggleFilter}
            value={searchQuery}
            //onChange={(e) => setSearchQuery(e.target.value)} // update searchQuery state
            className="block w-full bg-white px-4 py-2 text-gray-700 focus:outline-none"
            placeholder="Select student..."
            required
          />
        )}
        <button
          type="submit"
          onClick={handleClick}
          className="bg-white px-4 py-2 text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {filterOpen && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow">
          <ul className="py-2 text-sm text-gray-700">{filterOptions()}</ul>
        </div>
      )}
    </div>
  );
};

export default StudentFilter;
