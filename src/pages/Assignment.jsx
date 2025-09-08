import { useState, useEffect } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Assignment = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(false);

  // Filter states
  const [selectedBase, setSelectedBase] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(total / limit);

  const fetchAssignments = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("No token found. Please login first.");
      return;
    }

    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        sortBy: "startDate",
        sortOrder: "desc",
        limit,
        skip: (page - 1) * limit,
      });

      if (selectedBase) queryParams.append("base", selectedBase);
      if (status) queryParams.append("status", status);
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(
        `https://servermms.onrender.com/api/assignments?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch assignments");

      const data = await res.json();
      setAssignments(data.assignments || []);
      setTotal(data.total || 0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [page, limit]);

  // Reset Filters
  const handleReset = () => {
    setSelectedBase("");
    setStatus("");
    setSearchQuery("");
    setPage(1);
    fetchAssignments();
  };

  const startResult = (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, total);

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
          <div className="text-lg font-bold">Assignments</div>
          <div className="flex gap-3">
            {/* Filter Button */}
            <button
              onClick={() => setFilter((prev) => !prev)}
              className="flex gap-2 text-lg border rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]"
            >
              <FiFilter className="pt-1 h-6 text-[#374151]" />
              <span>Filters</span>
            </button>

            {/* Add Assignment Button */}
            <button className="flex gap-2 text-lg border rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
              <GoPlus className="pt-1 h-7" />
              <span>Add Assignment</span>
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
                  value={selectedBase}
                  onChange={(e) => setSelectedBase(e.target.value)}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All bases</option>
                  <option value="Base Alpha">Base Alpha</option>
                  <option value="Base Bravo">Base Bravo</option>
                  <option value="Base Charlie">Base Charlie</option>
                </select>
              </div>
              {/* Asset*/}
              <div>
                <label>Asset Type</label>
                <select
                  value={selectedBase}
                  onChange={(e) => setSelectedBase(e.target.value)}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All bases</option>
                  <option value="Base Alpha">Base Alpha</option>
                  <option value="Base Bravo">Base Bravo</option>
                  <option value="Base Charlie">Base Charlie</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Lost</option>
                  <option value="Pending">Returned</option>
                  <option value="Pending">Damaged</option>
                </select>
              </div>

              {/* Start date */}
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  placeholder="Search by asset name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
                />
              </div>

              {/* End date */}
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  placeholder="Search by asset name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
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
                  className="block w-full border-0 rounded-md shadow-sm focus:outline-none"
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
                  fetchAssignments();
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
                    ASSIGNED TO
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    PURPOSE
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium">
                    QUANTITY
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
                {assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <tr
                      key={assignment._id || index}
                      className="border-t border-[#e5e7eb] hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-[#0284c7] font-medium cursor-pointer">
                        <div>{assignment.assetName}</div>
                        <div className="text-sm font-normal text-[#6b7280]">
                          {assignment.assetType}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {assignment.base}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        <div>{assignment.assignedTo?.name || "-"}</div>
                        <div>
                          <span>{assignment.assignedTo?.rank || "-"}</span>
                          <span>({assignment.assignedTo?.id || "-"})</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {assignment.purpose}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {assignment.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {assignment.status}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {new Date(assignment.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0284c7]">View</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No assignments found
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
                ? `Showing ${startResult} to ${endResult} of ${total} results`
                : "No results"}
            </div>
            <div className="flex gap-3">
              <div>
                <select
                  id="options"
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value));
                    setPage(1);
                  }}
                  className="block border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
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

export default Assignment;
