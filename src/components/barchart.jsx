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
  // const data = {
  //   labels: ["Weapon", "Vehicle", "Ammunition"],
  //   datasets: [
  //     {
  //       label: "Assets",
  //       data: [1200, 1000, 9000],
  //       backgroundColor: "#0284C7",
  //     },
  //   ],
  // };
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: true, // keeps aspect ratio
  //   aspectRatio: 10,
  //   resizeDelay: 200, //  delay for resize (ms)
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Responsive Bar Chart",
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       min: 0,
  //       max: 9000,
  //       ticks: {
  //         stepSize: 1000,
  //         autoSkip: false,
  //         padding: 20,
  //         callback: function (value) {
  //           return value; // show 1000, 2000, … 9000
  //         },
  //       },
  //     },
  //   },
  // };

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
  const data = {
    labels: ["Weapon", "Vehicle", "Ammunition"],
    datasets: [
      {
        label: "Available",
        data: [1200, 1000, 9000],
        backgroundColor: "#10B981",
      },
      {
        label: "Assigned",
        data: [500, 400, 2000],
        backgroundColor: "#F59E0B",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: false,
  //     },
  //   },
  // };
  return (
    <>
      <div className="flex justify-center pe-6 w-[350px] sm:w-full md:w-full h-[300px] ">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default BarChart;
