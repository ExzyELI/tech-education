import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
interface StatsProps {
  score: number | null;
  elapsedTime: number;
  attempts: number;
  renderStars: () => number;
}
export default function Stats({
  score,
  elapsedTime,
  attempts,
  renderStars,
}: StatsProps) {
  // function to format time
  const formatTime = (seconds: number): string => {
    // checking if seconds is NaN
    if (isNaN(seconds)) {
      // if it is NaN, then return "00:00:00"
      return "00:00:00";
    }

    // if not, then format the time
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // add leading zeroes
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // star icons
  const renderStarIcons = () => {
    const stars = renderStars();
    const starIcons = [];
    for (let i = 0; i < 3; i++) {
      if (i < stars) {
        starIcons.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />,
        );
      } else {
        starIcons.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />,
        );
      }
    }
    return starIcons;
  };

  return (
    /* score box */
    <div className="flex justify-end">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex flex-row justify-center text-2xl font-bold text-[#ff6865]">
          Game Stats
        </div>
        {/* Render stars */}
        <div className="mb-6 ml-1 flex justify-center text-3xl">
          {renderStarIcons()}
        </div>
        <div className="mb-6">
          <div className="flex flex-row justify-center text-xl font-bold text-[#5c93ff]">
            Score
          </div>
          <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#fca5a5] text-2xl font-bold text-white md:w-40">
            {score !== null ? `${score} / 4` : "N/A"}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex flex-row justify-center text-xl font-bold text-[#5c93ff]">
            Time
          </div>
          <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#fcd34d] text-2xl font-bold text-white md:w-40">
            {elapsedTime !== null ? formatTime(elapsedTime) : "00:00:00"}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-center text-xl font-bold text-[#5c93ff]">
            Attempts
          </div>
          <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#6cbf73] text-2xl font-bold text-white md:w-40">
            {attempts}
          </div>
        </div>
      </div>
    </div>
  );
}
