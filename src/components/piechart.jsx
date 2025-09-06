import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function PieChart({ data }) {
  const assetsByType = data?.assetsByType || {};

  const labels = assetsByType.map((item) => item.type);
  // values → e.g., available count
  const values = assetsByType.map((item) => item.count);
  // console.log(assetsByType);
  const data1 = {
    labels: labels,
    datasets: [
      {
        data: values, // use your counts here
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
      {/* <Pie
        data={data}
        className="h-45 flex justify-center scrollbar-none text-center pt-3 "
        options={options}
        // style={{ width: "300px", height: "300px" }}
      /> */}
      <div className="flex justify-center pe-6 w-[350px] sm:w-full md:w-full h-[300px]">
        <Pie data={data1} options={options} />
      </div>
    </>
  );
}

export default PieChart;
