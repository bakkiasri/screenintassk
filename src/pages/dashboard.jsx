import Layout from "../layouts/main";

import PieChart from "../components/piechart";
import { useState, useEffect } from "react";
import BarChart from "../components/barchart";
import { Link } from "react-router-dom";
import Totals from "../components/totals";
import Tables from "../components/table";
import TablesA from "../components/tableA";
const Dashboard = () => {
  const [selected, setSelected] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const recentTransfers = dashboardData?.recentTransfers || [];
  const recentPurchases = dashboardData?.recentPurchases || [];
  const recentAssignments = dashboardData?.recentAssignments || [];
  const recentExpenditures = dashboardData?.recentExpenditures || [];

  const recentTransferHeader = [
    "Asset",
    "From",
    "To",
    "Quantity",
    "Status",
    "Date",
  ];
  const recentPurchaseHeader = ["Asset", "Base", "Quantity", "Status", "Date"];
  const recentExpenditureHeader = [
    "Asset",
    "Base",
    "Quantity",
    "Status",
    "Date",
  ];

  const recentAssignmentsHeader = [
    "Asset",
    "ASSIGNED TO",
    "Quantity",
    "Status",
    "Date",
  ];
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
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

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
          <Totals data={recentTransfers} />
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
          <Tables
            data={recentTransfers}
            tablehead={recentTransferHeader}
            title="Recent Transfers"
          />
          <Tables
            data={recentPurchases}
            tablehead={recentPurchaseHeader}
            title="Recent Purchase"
          />
        </div>
        <div className="flex grid grid-cols-1  lg:grid-cols-2 gap-3">
          <TablesA data={recentAssignments} />
          <Tables
            data={recentExpenditures}
            tablehead={recentExpenditureHeader}
            title="Recent Expenditures"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
