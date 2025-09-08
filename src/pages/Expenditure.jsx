import { useState, useEffect, useCallback } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Expenditure = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // rows per page
  const [total, setTotal] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    base: "",
    supplier: "",
    status: "",
    startDate: "",
    endDate: "",
    search: "",
  });

  const totalPages = Math.ceil(total / limit);

  // 🔹 Fetch function
  const fetchAssets = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No token found. Please login first.");
      return;
    }

    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        sortBy: "expenditureDate",
        sortOrder: "desc",
        limit: limit,
        skip: (page - 1) * limit,
        ...(filters.base && { base: filters.base }),
        ...(filters.supplier && { supplier: filters.supplier }),
        ...(filters.status && { status: filters.status }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.search && { search: filters.search }),
      });

      const res = await fetch(
        `https://servermms.onrender.com/api/expenditures?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch assets data");

      const data = await res.json();

      setAssets(data.expenditures || []);
      setTotal(data.total || 0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  // Run only when page/limit changes
  useEffect(() => {
    fetchAssets();
  }, [page, limit, fetchAssets]);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filters (manual fetch)
  const applyFilters = () => {
    setPage(1);
    fetchAssets();
    setFilterVisible(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      base: "",
      supplier: "",
      status: "",
      startDate: "",
      endDate: "",
      search: "",
    });
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
          <div className="text-xl font-semibold">Expenditure</div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilterVisible((prev) => !prev)}
              className="flex gap-2 text-lg border rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]"
            >
              <FiFilter className="pt-1 h-6 text-[#374151]" />
              <span>Filters</span>
            </button>

            <button className="flex gap-2 text-lg border rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
              <GoPlus className="pt-1 h-7" />
              <span>Add Expenditure</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        {filterVisible && (
          <div className="flex-row p-3 bg-white rounded-sm mt-5 shadow-sm">
            <div className="text-xl p-3">Filter</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
              {/* Base */}
              <div>
                <label>Base</label>
                <select
                  name="base"
                  value={filters.base}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All bases</option>
                  <option value="Base Alpha">Base Alpha</option>
                  <option value="Base Bravo">Base Bravo</option>
                  <option value="Base Charlie">Base Charlie</option>
                </select>
              </div>

              {/* Supplier (Asset Type) */}
              <div>
                <label>Asset Type</label>
                <select
                  name="supplier"
                  value={filters.supplier}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All asset types</option>
                  <option value="Weapon">Weapon</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Ammunition">Ammunition</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
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
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* End Date */}
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* Search */}
              <div>
                <label>Search</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Search by asset name"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-3">
              <button
                onClick={resetFilters}
                className="border py-2 px-4 rounded-md border-[#d1d5db] hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="border py-2 px-4 rounded-md bg-[#0284c7] text-white"
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}

        {/* Table Section */}
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
                    QUANTITY
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    REASON
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    EXPENDED BY
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
                {assets.map((asset, index) => (
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
                      {asset.quantity}
                    </td>
                    <td className="p-4 text-xs">
                      <div
                        className={`rounded-full text-center p-1 ${
                          asset.reason === "Training"
                            ? "bg-sky-200 text-sky-900"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {asset.reason}
                      </div>
                      <div className="text-[#6b7280] text-center">
                        {asset.operationName}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#6b7280]">
                      <div className="text-center">
                        {asset.expendedBy?.name || "-"}
                      </div>
                      <div className="text-xs text-center">
                        {asset.expendedBy?.rank || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#6b7280]">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#0284c7]">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between px-4">
            <div className="flex mt-4">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} results
            </div>
            <div className="flex gap-3">
              <div className="flex mt-4">
                <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="block w-full border hover:border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-3 py-1 rounded-l-md border disabled:opacity-50"
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

export default Expenditure;
