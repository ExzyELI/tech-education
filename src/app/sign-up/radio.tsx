interface Radioroles {
  role: string;
  setradioButton: (role: string) => void;
}

const Radio: React.FC<Radioroles> = ({ role, setradioButton }) => {
  const handleRadio = (option: string) => {
    setradioButton(option);
  };

  return (
    <div className="mb-5 flex items-start justify-between">
      <input
        id="student-radio"
        type="radio"
        value="Student"
        name="user-type-radio"
        checked={role === "Student"}
        onChange={() => handleRadio("Student")}
        className="sr-only"
      />
      <label
        htmlFor="student-radio"
        className={`me-4 cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium transition-colors duration-300 hover:border-[#ee6e6a] hover:bg-[#feebe1] ${
          role === "Student"
            ? "border-[#ee6e6a] bg-[#feebe1] text-[#434343]"
            : ""
        }`}
        style={{ width: "140px" }}
      >
        Student
      </label>
      <input
        id="parent-radio"
        type="radio"
        value="Parent"
        name="user-type-radio"
        checked={role === "Parent"}
        onChange={() => handleRadio("Parent")}
        className="sr-only"
      />
      <label
        htmlFor="parent-radio"
        className={`me-4 cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium transition-colors duration-300 hover:border-[#ee6e6a] hover:bg-[#feebe1] ${
          role === "Parent"
            ? "border-[#ee6e6a] bg-[#feebe1] text-[#434343]"
            : ""
        }`}
        style={{ width: "140px" }}
      >
        Parent
      </label>
      <input
        id="teacher-radio"
        type="radio"
        value="Teacher"
        name="user-type-radio"
        checked={role === "Teacher"}
        onChange={() => handleRadio("Teacher")}
        className="sr-only"
      />
      <label
        htmlFor="teacher-radio"
        className={`cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium transition-colors duration-300 hover:border-[#ee6e6a] hover:bg-[#feebe1] ${
          role === "Teacher"
            ? "border-[#ee6e6a] bg-[#feebe1] text-[#434343]"
            : ""
        }`}
        style={{ width: "140px" }}
      >
        Teacher
      </label>
    </div>
  );
};

export default Radio;
