"use client";
import { ReactNode } from 'react';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";

export default function Home() {

  const [showSettings, setShowSettings] = useState(false);
  const [students,setStudents] = useState([""]);
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [pin, setPin] = useState("");

  // Function to add a student
  const handleAddStudent = () => {
    const newStudentName = prompt("Enter the name of the new student:");
    if (newStudentName) {
      setStudents([...students, newStudentName]);
    }
  };

  // Function to remove a student
  const handleRemoveStudent = (indexToRemove: number) => {
    const updatedStudents = students.filter((student, index) => index !== indexToRemove);
    setStudents(updatedStudents);
  };

  // Function to handle changing the teacher name
  const handleChangeTeacherName = () => {
    const newTeacherName = prompt("Enter the new teacher name:");
    if (newTeacherName) {
      setTeacherName(newTeacherName);
    }
  };
  // Function to handle changing the classroom name
  const handleChangeClassName = () => {
    const newClassName = prompt("Enter the new classroom name:");
    if (newClassName) {
      setClassName(newClassName);
    }
  };
  //Function to bring up settings menu
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

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

            <div className="col-span-1 row-span-1 mb-10">
              <div className="flex items-center justify-center object-center">
                <img
                  className="h-[250px]"
                  src="https://i.imgur.com/1EDuUBO.png"
                />
              </div>
            </div>

            {/* three sections */}
            <div className="grid grid-flow-col grid-rows-4 gap-10 text-center ">
              <div className="col-span-1 row-span-1 rounded-md border border-gray-200 bg-white">
                <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
                  Teacher Info
                </div>
                <table className="flex table-auto flex-col items-center justify-center">
                  <tbody>
                    <tr>
                      {/* create a Tname option that changes according to Tname */}
                      <td>Name:</td>
                      <td>{teacherName}</td>
                    </tr>
                    <tr>
                      {/* create a class naming option so class name changes depending on classroom */}
                      <td>Class:</td>
                      <td>{className}</td>
                    </tr>
                    <tr>
                      {/* create a pin option so students can join classroom */}
                      <td>PIN:</td>
                      <td className="blur-sm hover:blur-none ">{1234}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-span-1 row-span-1 rounded-md border border-gray-200 bg-white">
                <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
                  Actions
                </div>
                <table className="flex table-auto flex-col items-center justify-center">
                  <tbody>
                  <tr className="cursor-pointer hover:text-[#ff6865]" onClick={handleAddStudent}>
                      {/* create a class naming option so class name changes depending on classroom */}
                      <td>Add Student</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#ff6865]" onClick={handleChangeTeacherName}>
                      {/* create a pin option so students can join classroom */}
                      <td>Edit Name</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#ff6865]" onClick={handleChangeClassName}>
                      {/* create a Tname option that changes according to Tname */}
                      <td>Edit Classroom Name</td>
                      </tr>
                    <tr className="cursor-pointer hover:text-[#ff6865]">
                      {/* create a pin option so students can join classroom */}
                      <td>Switch Classroom</td>
                    </tr>
                    <tr>
                    <button
          className="cursor-pointer hover:text-[#ff6865]"
          onClick={toggleSettings}
        >
          Advanced Settings
        </button> 
        </tr>
                    {showSettings && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg">
          <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Change Pin</button>
          <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 font-bold text-red-500">Delete Classroom</button>
        </div>
        )}
                  </tbody>
                </table>
              </div>
              <div className="col-span-1 row-span-3 rounded-md border border-gray-200 bg-white">
        <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
          Students
        </div>
        <table className="flex table-auto flex-col border-b border-gray-200">
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="flex border-b border-gray-200">
                <td>{student}</td>
                <td className="ml-auto">
                  <div className="cursor-pointer hover:text-[#ff6865]" onClick={() => handleRemoveStudent(index)}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </div>
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

      <Footer />
    </main>
  );
}
