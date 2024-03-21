import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

// define activity data
interface Activity {
  activityName: string;
  score: number;
}

// define props
interface SearchFilterProps {
  activityData: Activity[];
  setFilteredActivityData: React.Dispatch<React.SetStateAction<Activity[]>>;
}

// define component
const SearchFilter: React.FC<SearchFilterProps> = ({
  activityData,
  setFilteredActivityData,
}) => {
  // define state variables
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [uniqueActivityNames, setUniqueActivityNames] = useState<string[]>([]);

  // create unique activity names whenever activityData changes
  // removes duplicates
  useEffect(() => {
    const uniqueNames = Array.from(
      new Set(activityData.map((activity) => activity.activityName)),
    );
    setUniqueActivityNames(uniqueNames);
  }, [activityData]);

  // filter data when searchQuery is changed
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredActivityData(activityData); // resets to default if empty
    } else {
      const filteredData = activityData.filter((activity) =>
        activity.activityName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredActivityData(filteredData); // set filtered data based on search query
    }
  }, [searchQuery, activityData, setFilteredActivityData]);

  // toggle filter dropdown
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // select activity from filter dropdown
  const selectActivity = (activityName: string) => {
    setSearchQuery(activityName); // update searchQuery
    setFilterOpen(false);
  };

  // filter dropdown options without duplicates
  const filterOptions = () => {
    return uniqueActivityNames.map((activityName) => (
      <li key={activityName}>
        <button
          type="button"
          onClick={() => selectActivity(activityName)}
          className="block w-full px-4 py-2 text-left hover:bg-blue-200 focus:bg-blue-200 focus:outline-none"
        >
          {activityName}
        </button>
      </li>
    ));
  };

  return (
    <div className="relative z-10 mb-8">
      <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white">
        <button
          onClick={toggleFilter}
          className="bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
          type="button"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // update searchQuery state
          className="block w-full bg-white px-4 py-2 text-gray-700 focus:outline-none"
          placeholder="Search activity..."
          required
        />
        <button
          type="submit"
          className="bg-white px-4 py-2 text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} />
          <span className="sr-only">Search</span>
        </button>
      </div>
      {filterOpen && (
        <div className="absolute top-full z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow">
          <ul className="py-2 text-sm text-gray-700">{filterOptions()}</ul>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
