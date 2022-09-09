import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const LeaderboardChart = ({ leaderboard }) => {
  const data = {
    labels: leaderboard.map((contestant) => contestant.name),
    datasets: [
      {
        label: "Online Votes",
        data: leaderboard.map((contestant) => contestant.online_votes),
        backgroundColor: [
            "rgba(74, 222, 128, 0.25)",
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Offline Votes",
        data: leaderboard.map((contestant) => contestant.offline_votes),
        backgroundColor: [
            "rgba(248, 113, 113, 0.25)",
        ],
        borderColor: [
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
      },

    ],
  };
  const options = {
    scales: {
      y: { beginAtZero: true },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Contestants Votes Leaderboard",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LeaderboardChart;
