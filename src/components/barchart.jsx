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

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Weapon", "Vehicle", "Ammunition"],
    datasets: [
      {
        label: "Assets",
        data: [1200, 1000, 9000],
        backgroundColor: "#0284C7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 9000,
        ticks: {
          stepSize: 1000,
          autoSkip: false,
          padding: 20,
          callback: function (value) {
            return value; // show 1000, 2000, … 9000
          },
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-lg text-center font-semibold m">Assets Overview</h2>
      <Bar
        data={data}
        options={options}
        className="w-full  flex justify-center scrollbar-none   "
      />
    </>
  );
};

export default BarChart;
