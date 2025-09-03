import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = () => {
  const data = {
    labels: ["Total Assets", "Available", "Assigned", "Expended"],
    datasets: [
      {
        data: [14, 11435, 25000, 1000], // use your counts here
        backgroundColor: ["#0284c7", "#16a34a", "#eab308", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    // responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <h2 className="text-lg text-center font-semibold mb-2">
        Assets Overview
      </h2>
      <Pie
        data={data}
        className="h-45 flex justify-center scrollbar-none text-center pt-3 "
        options={options}
        // style={{ width: "300px", height: "300px" }}
      />
    </>
  );
};

export default PieChart;
