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

function BarChart({ data }) {
  const assetsByType = data?.assetsByType || {};

  const labels = assetsByType.map((item) => item.type);
  // values → e.g., available count
  const values = assetsByType.map((item) => item.count);
  console.log(assetsByType);
  const data1 = {
    labels: labels,
    datasets: [
      {
        label: "Available",
        backgroundColor: "#10B981",
        data: values, // available counts
      },
      {
        label: "Assigned",
        backgroundColor: "#F59E0B",
        data: values, // assigned counts
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    resizeDelay: 200,
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
    <div className="flex justify-center pe-6 w-[350px] sm:w-full md:w-full h-[300px]">
      <Bar data={data1} options={options} />
    </div>
  );
}

export default BarChart;
