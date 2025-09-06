import Layout from "../layouts/main";
import PieChart from "../components/piechart";
import { useState, useEffect } from "react";
import BarChart from "../components/barchart";
import { Link } from "react-router-dom";
import Totals from "../components/totals";
import Tables from "../components/table";
import TablesA from "../components/tableA";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      toast.error("No token found. Please login first.");
      setLoading(false);
      return;
    }

    // ✅ Build query dynamically
    let query = new URLSearchParams();
    if (selectedBase) query.append("base", selectedBase);
    if (selectedAssetType) query.append("assetType", selectedAssetType);
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    const url = `https://servermms.onrender.com/api/dashboard?${query.toString()}`;

    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        toast.error(err.message);
        setLoading(false);
      });
  }, [selectedBase, selectedAssetType, startDate, endDate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="h-screen flex-row mt-10 bg-gray-50 p-3 space-y-3  justify-center items-center">
        <div className="text-xl font-semibold">Dashboard</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 bg-white rounded-lg p-3 gap-3 shadow">
          {/* Base Filter */}
          <div className="flex-row ">
            <div>Base</div>
            <div>
              <select
                id="base"
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
                className="block w-full border-0 hover:border-gray-300 rounded-md shadow-sm focus:outline-none"
              >
                <option value="">All bases</option>
                <option value="Base Alpha">Base Alpha</option>
                <option value="Base Bravo">Base Bravo</option>
                <option value="Base Charlie">Base Charlie</option>
              </select>
            </div>
          </div>

          {/* Asset Type Filter */}
          <div className="flex-row ">
            <div>Assets type</div>
            <div>
              <select
                id="assetType"
                value={selectedAssetType}
                onChange={(e) => setSelectedAssetType(e.target.value)}
                className="block w-full border-0 hover:border-gray-300 rounded-md shadow-sm focus:outline-none"
              >
                <option value="">All asset types</option>
                <option value="Weapon">Weapon</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Equipment">Equipment</option>
                <option value="Ammunition">Ammunition</option>
                <option value="Medical">Medical</option>
                <option value="Food">Food</option>
              </select>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex-row">
            <div className="">Date Range</div>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-0 shadow-sm rounded-lg px-3 py-2"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-0 shadow-sm rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Totals data={dashboardData} />
        </div>

        {/* Charts */}
        <div className="flex grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          <div className="flex-row bg-white w-full max-w-4xl mx-auto items-center px-[35px] sm:px-0 md:px-[35px] lg:px-[25px] p-4 justify-center shadow-xl ">
            <h2 className="text-lg text-center font-semibold mb-2">
              Assets Overview
            </h2>{" "}
            <PieChart data={dashboardData} />
          </div>
          <div className="flex-row  w-full mx-auto max-w-4xl items-center px-[35px] sm:px-0 md:px-[35px] lg:px-[25px] justify-center p-4 text-center shadow-xl ">
            <h2 className="text-lg text-center font-semibold m">
              Assets Overview
            </h2>

            <BarChart />
          </div>
        </div>

        {/* Tables */}
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
