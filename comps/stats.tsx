interface StatsProps {
  score: number | null;
  elapsedTime: number;
  attempts: number;
}
export default function Stats({ score, elapsedTime, attempts }: StatsProps) {
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

  return (
    /* score box */
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <div className="flex flex-row justify-center text-lg font-semibold text-[#5c93ff]">
          Score
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#fca5a5] text-2xl font-bold text-white md:w-40">
          {score !== null ? score : "N/A"}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-row justify-center text-lg font-semibold text-[#5c93ff]">
          Time
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#fcd34d] text-2xl font-bold text-white md:w-40">
          {elapsedTime !== null ? formatTime(elapsedTime) : "00:00:00"}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center text-lg font-semibold text-[#5c93ff]">
          Attempts
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#6cbf73] text-2xl font-bold text-white md:w-40">
          {attempts}
        </div>
      </div>
    </div>
  );
}
