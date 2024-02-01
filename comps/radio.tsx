interface Radioroles {
  role: string;
  setradioButton: (role: string) => void;
}

const Radio: React.FC<Radioroles> = ({ role, setradioButton }) => {

  const handleRadio = (option: string) => {
    setradioButton(option);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="student-radio"
          type="radio"
          value="Student"
          name="user-type-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={role === 'Student'}
          onChange={() => handleRadio('Student')} />
        <label
          htmlFor="student-radio"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Student
        </label>
      </div>

      <div className="flex items-center">
        <input
          id="parent-radio"
          type="radio"
          value="Parent"
          name="user-type-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={role === 'Parent'}
          onChange={() => handleRadio('Parent')}/>
        <label
          htmlFor="parent-radio"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Parent
        </label>
      </div>

      <div className="flex items-center">
        <input
          id="teacher-radio"
          type="radio"
          value="Teacher"
          name="user-type-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={role === 'Teacher'}
          onChange={() => handleRadio('Teacher')}/>
        <label
          htmlFor="teacher-radio"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Teacher
        </label>
      </div>
    </>
  );
};

export default Radio;