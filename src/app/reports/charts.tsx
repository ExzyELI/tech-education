import React from "react";
// npm install react-chartjs-2 chart.js
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

interface ChartProps {
  activityName: string;
  highestScore: number;
  lowestScore: number;
  averageScore: number;
}

const Charts: React.FC<ChartProps> = ({
  activityName,
  highestScore,
  lowestScore,
  averageScore,
}) => {
  const scaleScore = (score: number) => {
    return (score / 4) * 100;
  };

  const highestScoreData = {
    datasets: [
      {
        data: [scaleScore(highestScore), 100 - scaleScore(highestScore)],
        backgroundColor: ["#ff6b68", "#fed7d7"],
      },
    ],
  };

  const lowestScoreData = {
    datasets: [
      {
        data: [scaleScore(lowestScore), 100 - scaleScore(lowestScore)],
        backgroundColor: ["#63b3ed", "#bee3f8"],
      },
    ],
  };

  const averageScoreData = {
    datasets: [
      {
        data: [scaleScore(averageScore), 100 - scaleScore(averageScore)],
        backgroundColor: ["#24ce67", "#aff3ca"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-md">
      <h5 className="-mt-2 mb-4 text-center text-2xl font-bold text-gray-900">
        {activityName}
      </h5>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <Doughnut data={highestScoreData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#ff6b68]">
              {highestScore}
            </div>
          </div>
          <h6 className="mt-2 text-center text-base font-bold text-[#ff6b68]">
            Highest Score
          </h6>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <Doughnut data={lowestScoreData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#63b3ed]">
              {lowestScore}
            </div>
          </div>
          <h6 className="mt-2 text-center text-base font-bold text-[#63b3ed]">
            Lowest Score
          </h6>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <Doughnut data={averageScoreData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#24ce67]">
              {averageScore.toFixed(1)}
            </div>
          </div>
          <h6 className="mt-2 text-center text-base font-bold text-[#24ce67]">
            Average Score
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Charts;
