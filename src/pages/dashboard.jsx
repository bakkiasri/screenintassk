import Layout from "../layouts/main";

import PieChart from "../components/piechart";
import { useState, useEffect } from "react";
import BarChart from "../components/barchart";
import { Link } from "react-router-dom";
import Totals from "../components/totals";
const Dashboard = () => {
  const [selected, setSelected] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(dashboardData);
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No token found. Please login first."); // ✅ toast
      setLoading(false);
      return;
    }

    fetch("https://servermms.onrender.com/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message); // ✅ show error in toast
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      <div className="h-screen flex-row bg-gray-50 p-3 space-y-3 justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 bg-white rounded-lg p-3 gap-3 shadow">
          <div className="flex-row ">
            <div>Base</div>
            <div>
              <select
                id="options"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="block w-full  border hover:border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none  focus:border-none"
              >
                <option value="" disabled>
                  All bases
                </option>
                <option value="assets">Total Assets</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="expended">Expended</option>
              </select>
            </div>
          </div>
          <div className="flex-row ">
            <div>Assets type</div>
            <div>
              <select
                id="options"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="block w-full  border hover:border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none  focus:border-none"
              >
                <option value="" disabled>
                  All bases
                </option>
                <option value="assets">Total Assets</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="expended">Expended</option>
              </select>
            </div>
          </div>
          <div className="flex-row ">
            <div>Base</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Totals data={dashboardData} />
        </div>

        <div className="flex grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          <div className="flex-row bg-white px-30 p-4 justify-center shadow-xl ">
            <PieChart />
          </div>
          <div className="flex-row bg-white px-30 p-4 justify-center shadow-xl ">
            <BarChart />
          </div>
        </div>
        <div className="flex grid grid-cols-1  lg:grid-cols-2 gap-3">
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Assets Overview
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1000px]  ">
                <thead className="border-b-1 border-gray-200">
                  <tr className="p-2 text-[#6b7280]">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      ASSET
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      QUALITY
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      STATUS
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[#6b7280]">
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Assets Overview
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1000px]  ">
                <thead className="border-b-1 border-gray-200">
                  <tr className="p-2 text-[#6b7280]">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      ASSET
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      QUALITY
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      STATUS
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[#6b7280]">
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex grid grid-cols-1  lg:grid-cols-2 gap-3">
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Recent Assignments
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1000px]  ">
                <thead className="border-b-1 border-gray-200">
                  <tr className="p-2 text-[#6b7280]">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      ASSET
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      QUALITY
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      STATUS
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[#6b7280]">
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Recent Expenditures
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1000px]  ">
                <thead className="border-b-1 border-gray-200">
                  <tr className="p-2 text-[#6b7280]">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      ASSET
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      QUALITY
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      STATUS
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[#6b7280]">
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
