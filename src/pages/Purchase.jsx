import { useState, useEffect } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Purchase = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(false);

  // filter states
  const [base, setBase] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const totalPages = Math.ceil(total / limit);

  const fetchAssets = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No token found. Please login first.");
      return;
    }

    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        sortBy: "purchaseDate",
        sortOrder: "desc",
        limit,
        skip: (page - 1) * limit,
      });

      if (base) queryParams.append("base", base);
      if (supplier) queryParams.append("supplier", supplier);
      if (status) queryParams.append("status", status);
      if (searchQuery) queryParams.append("search", searchQuery);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const res = await fetch(
        `https://servermms.onrender.com/api/purchases?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch purchases data");

      const data = await res.json();
      setAssets(data.purchases || []);
      setTotal(data.total || 0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [page, limit]);

  const handleReset = () => {
    setBase("");
    setSupplier("");
    setStatus("");
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    fetchAssets();
  };

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
      <div className="flex-row justify-center mt-5 py-4 items-center">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Purchases</div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter((prev) => !prev)}
              className="flex gap-2 text-lg border rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]"
            >
              <FiFilter className="pt-1 h-6 text-[#374151]" />
              <span>Filters</span>
            </button>
            <button className="flex gap-2 text-lg border rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
              <GoPlus className="pt-1 h-7" />
              <span>Add Purchase</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        {filter && (
          <div className="flex-row p-3 bg-white rounded-sm mt-5 shadow-sm">
            <div className="text-xl p-3">Filter</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
              {/* Base */}
              <div>
                <label>Base</label>
                <select
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="Base Alpha">Base Alpha</option>
                  <option value="Base Bravo">Base Bravo</option>
                </select>
              </div>

              {/* Supplier */}
              <div>
                <label>Supplier</label>
                <input
                  type="text"
                  placeholder="Enter supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* End Date */}
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* Search */}
              <div>
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Search by asset name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-3">
              <button
                onClick={handleReset}
                className="border py-2 px-4 rounded-md border-[#d1d5db] hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setPage(1);
                  fetchAssets();
                }}
                className="border py-2 px-4 rounded-md bg-[#0284c7] text-white"
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="mt-4 bg-white border border-gray-200 shadow-md rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="text-[#6b7280]">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    ASSET
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    BASE
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    SUPPLIER
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    QUANTITY
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    TOTAL COST
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    STATUS
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    DATE
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.length > 0 ? (
                  assets.map((asset, index) => (
                    <tr
                      key={asset._id || index}
                      className="border-t border-[#e5e7eb] hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-[#0284c7] font-medium cursor-pointer">
                        <div>{asset.assetName}</div>
                        <div className="text-sm font-normal text-[#6b7280]">
                          {asset.assetType}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {asset.base}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {asset.supplier}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {asset.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        ${asset.totalCost}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            asset.status === "Delivered"
                              ? "bg-green-200 text-green-900"
                              : "bg-yellow-200 text-yellow-900"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {new Date(asset.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0284c7]">View</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No purchases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between px-4 py-4">
            <div className="flex items-center">
              {total > 0
                ? `Showing ${(page - 1) * limit + 1} to ${Math.min(
                    page * limit,
                    total
                  )} of ${total} results`
                : "No results"}
            </div>
            <div className="flex gap-3">
              <div>
                <select
                  id="options"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="block border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-3 py-1 border rounded-l-md disabled:opacity-50"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  <FaChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border ${
                      page === i + 1
                        ? "bg-[#f0f9ff] text-[#0284c7] border-[#0284c7]"
                        : "border-[#d1d5db] text-[#6b7280]"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 border rounded-r-md disabled:opacity-50"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Purchase;
