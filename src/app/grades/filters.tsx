import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface FiltersProps {
  applyFilters: (
    activity: string,
    timeFilter: string,
    scoreFilter: string,
  ) => void;
  clearFilters: () => void;
  activityNames: string[];
}

const Filters: React.FC<FiltersProps> = ({
  applyFilters,
  clearFilters,
  activityNames,
}) => {
  const [activityFilter, setActivityFilter] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [scoreFilter, setScoreFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleApplyFilters = () => {
    applyFilters(activityFilter, timeFilter, scoreFilter);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setActivityFilter("");
    setTimeFilter("");
    setScoreFilter("");
    clearFilters();
  };

  const activeFilters = activityFilter || timeFilter || scoreFilter;

  return (
    <div className="relative">
      {/* filter button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          ref={buttonRef}
          onClick={() => setShowFilters(!showFilters)}
          className="border-1 flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-3 py-1 font-semibold focus:outline-none"
          style={{
            backgroundColor: activeFilters ? "#ffe08d" : "white",
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="text-[#ff8282]" />
          <span className="text-gray-700">Filters</span>
        </button>
      </div>

      {/* dropdown menu */}
      {showFilters && (
        <div
          ref={dropdownRef}
          className="absolute left-0 z-10 mt-2 w-72 rounded-md border border-gray-300 bg-white px-6 py-4 shadow-lg"
          style={{ top: "calc(100%)" }}
        >
          {/* activity filter */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold">Activity</h4>
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Activity</option>
              {activityNames.map((activityName, index) => (
                <option key={index} value={activityName}>
                  {activityName}
                </option>
              ))}
            </select>
          </div>

          {/* time filter */}
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold">Time</h4>
            <div className="flex space-x-4">
              <button
                onClick={() => setTimeFilter("shortest")}
                className={`flex-1 rounded-md ${
                  timeFilter === "shortest"
                    ? "border border-gray-300 bg-[#ffe08d] text-gray-900"
                    : "border border-gray-300 bg-white text-gray-900"
                } px-4 py-2 text-sm hover:bg-[#ffe08d]`}
              >
                Shortest
              </button>
              <button
                onClick={() => setTimeFilter("longest")}
                className={`flex-1 rounded-md ${
                  timeFilter === "longest"
                    ? "border border-gray-300 bg-[#ffe08d] text-gray-900"
                    : "border border-gray-300 bg-white text-gray-900"
                } px-4 py-2 text-sm hover:bg-[#ffe08d]`}
              >
                Longest
              </button>
            </div>
          </div>

          {/* score filter */}
          <div className="mb-8">
            <h4 className="mb-2 text-sm font-semibold">Score</h4>
            <div className="flex space-x-4">
              <button
                onClick={() => setScoreFilter("highest")}
                className={`flex-1 rounded-md ${
                  scoreFilter === "highest"
                    ? "border border-gray-300 bg-[#ffe08d] text-gray-900"
                    : "border border-gray-300 bg-white text-gray-900"
                } px-4 py-2 text-sm hover:bg-[#ffe08d]`}
              >
                Highest
              </button>
              <button
                onClick={() => setScoreFilter("lowest")}
                className={`flex-1 rounded-md ${
                  scoreFilter === "lowest"
                    ? "border border-gray-300 bg-[#ffe08d] text-gray-900"
                    : "border border-gray-300 bg-white text-gray-900"
                } px-4 py-2 text-sm hover:bg-[#ffe08d]`}
              >
                Lowest
              </button>
            </div>
          </div>

          {/* apply and clear filter buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleApplyFilters}
              disabled={!activeFilters}
              className={`mr-4 rounded-md ${
                activeFilters
                  ? "bg-green-400 text-white hover:bg-green-500"
                  : "cursor-not-allowed bg-gray-300 text-gray-700"
              } px-8 py-2 focus:outline-none`}
            >
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="rounded-md bg-red-400 px-8 py-2 text-white hover:bg-red-500 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
