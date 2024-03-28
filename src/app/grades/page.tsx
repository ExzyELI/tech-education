"use client";
import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Nav from "../../../comps/nav";
import Footer from "../../../comps/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faClock,
  faRedo,
  faStar,
  faCalendarAlt,
  faSortAmountDown,
  faSortAmountUp,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { auth } from "../firebase/init_app";
import Filters from "./filters";

const GradesPage = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc"); // default sort order is descending
  const itemsPerPage = 15; // 15 items displayed on a page
  //const [originalGrades, setOriginalGrades] = useState<any[]>([]);
  const [consolidatedGrades, setConsolidatedGrades] = useState<any[]>([]);

  const toSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
};

const toHHMMSS = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
};


  // Consolidate KeyboardActivity-kindergarten entries
  const consolidateActivities = (activities: any[]) => {
  return activities.reduce((acc: any[], activity: any) => {
    if (activity.activityName === "KeyboardActivity-kindergarten" || activity.activityName === "KeyboardActivity-firstGrade" || activity.activityName === "KeyboardActivity-secondGrade") {
      const existing = acc.find(a => a.activityName === activity.activityName);
      if (existing) {
        existing.score = (existing.score || 0) + (activity.score || 0);
        existing.elapsedTime = toHHMMSS(toSeconds(existing.elapsedTime) + toSeconds(activity.elapsedTime));
        // Assuming the attempts property needs to be handled the same way for both activity types
        existing.KeyboardActivityKindergarten_attempts = (existing.KeyboardActivityKindergarten_attempts || 0) + (activity.KeyboardActivityKindergarten_attempts || 0);
        existing.KeyboardActivityfirstGrade_attempts = (existing.KeyboardActivityfirstGrade_attempts || 0) + (activity.KeyboardActivityfirstGrade_attempts || 0);
        existing.KeyboardActivitysecondGrade_attempts = (existing.KeyboardActivitysecondGrade_attempts || 0) + (activity.KeyboardActivitysecondGrade_attempts || 0);
      } else {
        acc.push({
          ...activity,
          elapsedTime: activity.elapsedTime,
          KeyboardActivityKindergarten_attempts: activity.KeyboardActivityKindergarten_attempts || 0,
          KeyboardActivityfirstGrade_attempts: activity.KeyboardActivityfirstGrade_attempts || 0,
          KeyboardActivitysecondGrade_attempts: activity.KeyboardActivitysecondGrade_attempts || 0,
        });
      }
    } else {
      acc.push(activity);
    }
    return acc;
  }, []);
};

  useEffect(() => {
    // auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchGrades(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // function to fetch grades from firestore
  const fetchGrades = async (userId: string) => {
    try {
      const firestore = getFirestore();
      const gradesRef = collection(firestore, `users/${userId}/activities`);
      const q = query(gradesRef, orderBy("timestamp", sortBy));
      const querySnapshot = await getDocs(q);

      const fetchedGrades: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedGrades.push(doc.data());
      });

      //setOriginalGrades(fetchedGrades);
      setGrades(fetchedGrades);
      setConsolidatedGrades(consolidateActivities(fetchedGrades));
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  // calulate pages based on grades and items per page
  const totalPages = Math.ceil(consolidatedGrades.length / itemsPerPage);
  // calculate start index of current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  // calculate end index of current page
  const endIndex = startIndex + itemsPerPage;
  // get grades for the current page
  //const currentGrades = grades.slice(startIndex, endIndex);
  // get grades for the current page
  const currentGrades = consolidatedGrades.slice(startIndex, endIndex);

  //sort kicks in after one click 
  //previously it would take two clicks until the page updates the sort
  useEffect(() => {
    const sortedGrades = [...consolidatedGrades];
    sortedGrades.sort((a, b) => {
      const timestampA = a.timestamp.seconds;
      const timestampB = b.timestamp.seconds;
      if (sortBy === "asc") {
        return timestampA - timestampB;
      } else {
        return timestampB - timestampA;
      }
    });
    setConsolidatedGrades(sortedGrades);
  }, [sortBy]);

  // function to sort order
  const toggleSortOrder = () => {
    setSortBy(sortBy === "asc" ? "desc" : "asc");

    // sorts the current filtered grades
    const sortedGrades = [...consolidatedGrades];
    sortedGrades.sort((a, b) => {
      const timestampA = a.timestamp.seconds;
      const timestampB = b.timestamp.seconds;
      if (sortBy === "asc") {
        return timestampA - timestampB;
      } else {
        return timestampB - timestampA;
      }
    });
    setConsolidatedGrades(sortedGrades);
  };

  // function to apply filters
  const applyFilters = (
    activity: string,
    timeFilter: string,
    scoreFilter: string,
    consolidatedGrades: any[],
  ) => {
    const parseTime = (timeStr: string) => {
      const [hours, minutes, seconds] = timeStr.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    let filteredGrades = [...consolidatedGrades];

    // applies activity filter
    if (activity) {
      filteredGrades = filteredGrades.filter(
        (grade) => grade.activityName === activity,
      );
    }

    // applies time filter
    if (timeFilter === "shortest") {
      filteredGrades.sort(
        (a, b) => parseTime(a.elapsedTime) - parseTime(b.elapsedTime),
      );
    } else if (timeFilter === "longest") {
      filteredGrades.sort(
        (a, b) => parseTime(b.elapsedTime) - parseTime(a.elapsedTime),
      );
    }

    // applies score filter
    if (scoreFilter === "highest") {
      filteredGrades.sort((a, b) => b.score - a.score);
    } else if (scoreFilter === "lowest") {
      filteredGrades.sort((a, b) => a.score - b.score);
    }

    setConsolidatedGrades(filteredGrades);
  };

  // function to clear filters
  const clearFilters = () => {
    setConsolidatedGrades(consolidateActivities(grades)); // resets filtered grades to original data
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-gray-800">
      <title>Grades</title>
      <Nav />
      <div className="mx-auto my-5 min-h-screen max-w-screen-xl px-4 sm:px-8">
        <div className="flex items-start">
          {/* filters component */}
          <div className="mr-4">
            {" "}
            <Filters
              applyFilters={(activity, timeFilter, scoreFilter) =>
                applyFilters(activity, timeFilter, scoreFilter, consolidatedGrades)
              }
              clearFilters={clearFilters}
              activityNames={Array.from(
                new Set(consolidatedGrades.map((grade) => grade.activityName)),
              )}
            />
          </div>

          {/* sort button */}
          <div>
            <div className="mb-4 flex items-center">
              <button
                onClick={toggleSortOrder}
                className="border-1 flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-3 py-1 font-semibold"
              >
                <FontAwesomeIcon
                  icon={sortBy === "desc" ? faSortAmountDown : faSortAmountUp}
                  className="text-[#ff8282]"
                />
                <span className="text-gray-700">
                  {sortBy === "desc" ? "Sort Oldest":"Sort Newest"  }
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* grades table */}
        <div className="border-1 overflow-x-auto rounded-lg border border-gray-300 bg-white">
          <div className="">
            <table className="w-full table-fixed border-collapse text-xs md:text-sm lg:text-xl">
              {/* table headers */}
              <thead>
                <tr className="bg-[#ff8282] text-white">
                  <th className="px-6 py-4 text-center font-semibold">
                    <FontAwesomeIcon
                      icon={faGamepad}
                      className="mr-2 text-[#ffe08d]"
                    />{" "}
                    Activity
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="mr-2 text-[#ffe08d]"
                    />{" "}
                    Score
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2 text-[#ffe08d]"
                    />{" "}
                    Time
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <FontAwesomeIcon
                      icon={faRedo}
                      className="mr-2 text-[#ffe08d]"
                    />{" "}
                    Attempts
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-[#ffe08d]"
                    />{" "}
                    Date
                  </th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {currentGrades.map((grade, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-[#F2EFFE]" : "bg-[#DDD6F3]"
                    }
                  >
                    <td className="px-6 py-4 text-center text-gray-800">
                      {grade.activityName}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-800">
                      {grade.score}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-800">
                      {grade.elapsedTime}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-800">
                    {grade.quiz1_attempts ||
                        grade.password1_attempts ||
                        grade.quizK_attempts ||
                        grade.matching1_attempts ||
                        grade.quiz2_attempts ||
                        grade.matchingK_attempts ||
                        grade.KeyboardActivityKindergarten_attempts ||
                        grade.KeyboardActivityfirstGrade_attempts ||
                        grade.KeyboardActivitysecondGrade_attempts ||
                        grade.matching2_attempts || 0}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-800">
                      {grade.timestamp
                        ? new Date(
                            grade.timestamp.seconds * 1000,
                          ).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        <div className="flex flex-1 justify-center px-4 py-3 pt-5 sm:px-6">
          {/* centered container */}
          <div className="flex justify-center">
            {/* responsive controls for small screens */}
            <div className="flex flex-1 sm:hidden">
              {/* prev page button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-[#ffe08d] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#ffe08d] ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              {/* next page button */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-[#ffe08d] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#ffe08d] ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>

            {/* larger screen */}
            <div className="hidden flex-1 items-center justify-center sm:flex sm:items-center sm:justify-between">
              {/* container */}
              <div className="inline-flex -space-x-px rounded-md">
                {/* prev page button */}
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-[#ff8282] ring-1 ring-inset ring-gray-300 ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
                </button>
                {/* dynamically render page numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === i + 1
                        ? "bg-[#ffe08d] text-gray-700 ring-1 ring-inset ring-gray-300"
                        : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-[#ffe08d] hover:text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {/* next page button */}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-[#ff8282] ring-1 ring-inset ring-gray-300 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default GradesPage;
