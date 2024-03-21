import React from "react";
// npm install react-chartjs-2 chart.js
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

// define activity data
interface Activity {
  activityName: string;
  score: number;
}

// define props
interface ChartProps {
  activityData: Activity[]; // array of activity data
}

// define component
const Charts: React.FC<ChartProps> = ({ activityData }) => {
  // scale score to percentage
  const scaleScore = (score: number) => {
    return (score / 4) * 100;
  };

  // function to create donut charts
  const createDonutCharts = () => {
    // group activity data by name
    const activityGroups: { [key: string]: number[] } = {};
    activityData.forEach((activity) => {
      if (!activityGroups[activity.activityName]) {
        activityGroups[activity.activityName] = [];
      }
      activityGroups[activity.activityName].push(activity.score);
    });

    // store elements for donut charts in array
    const donutCharts: JSX.Element[] = [];

    // looping through the activity groups
    for (const activityName in activityGroups) {
      if (Object.prototype.hasOwnProperty.call(activityGroups, activityName)) {
        const scores = activityGroups[activityName];
        const highestScore = Math.max(...scores); // calculate highest score
        const lowestScore = Math.min(...scores); // calculate lowest score
        const averageScore =
          scores.reduce((acc, score) => acc + score, 0) / scores.length; // calculate average score

        // push donut chart elements into array
        donutCharts.push(
          <div
            key={activityName}
            className="mb-8 w-full rounded-lg border bg-white p-6"
          >
            <h5 className="-mt-2 mb-4 text-center text-2xl font-bold text-gray-900">
              {activityName}
            </h5>
            <div className="grid grid-cols-3 gap-4">
              {/* highest score chart */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24">
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [
                            scaleScore(highestScore),
                            100 - scaleScore(highestScore),
                          ],
                          backgroundColor: ["#ff6b68", "#fed7d7"],
                        },
                      ],
                    }}
                    options={options}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#ff6b68]">
                    {highestScore}
                  </div>
                </div>
                <h6 className="mt-2 text-center text-base font-bold text-[#ff6b68]">
                  Highest Score
                </h6>
              </div>
              {/* lowest score chart */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24">
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [
                            scaleScore(lowestScore),
                            100 - scaleScore(lowestScore),
                          ],
                          backgroundColor: ["#63b3ed", "#bee3f8"],
                        },
                      ],
                    }}
                    options={options}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#63b3ed]">
                    {lowestScore}
                  </div>
                </div>
                <h6 className="mt-2 text-center text-base font-bold text-[#63b3ed]">
                  Lowest Score
                </h6>
              </div>
              {/* average score chart */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24">
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [
                            scaleScore(averageScore),
                            100 - scaleScore(averageScore),
                          ],
                          backgroundColor: ["#24ce67", "#aff3ca"],
                        },
                      ],
                    }}
                    options={options}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#24ce67]">
                    {averageScore.toFixed(1)}
                  </div>
                </div>
                <h6 className="mt-2 text-center text-base font-bold text-[#24ce67]">
                  Average Score
                </h6>
              </div>
            </div>
          </div>,
        );
      }
    }

    // if no activity data is found, display message
    if (activityData.length === 0) {
      return <p className="text-gray-500">No activities found</p>;
    }

    return donutCharts;
  };

  // charts options
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

  // create the charts
  return <div className="mt-4">{createDonutCharts()}</div>;
};

export default Charts;
