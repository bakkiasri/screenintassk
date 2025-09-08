import { useState, useEffect } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Popup from "../components/popup";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);

  // filters state
  const [filters, setFilters] = useState({
    role: "",
    base: "",
    status: "",
    search: "",
  });

  const totalPages = Math.ceil(total / limit);

  // fetch data
  const fetchAssets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No token found. Please login first.");
      return;
    }

    setLoading(true);
    try {
      // Build query params dynamically
      const params = new URLSearchParams({
        sortBy: "fullName",
        sortOrder: "asc",
        limit: limit,
        skip: (page - 1) * limit,
      });

      if (filters.role) params.append("role", filters.role);
      if (filters.base) params.append("base", filters.base);
      if (filters.status) params.append("active", filters.status);
      if (filters.search) params.append("search", filters.search);

      const res = await fetch(
        `https://servermms.onrender.com/api/users?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch users data");

      const data = await res.json();

      setAssets(data.users || data || []); // depends on your API structure
      setTotal(data.total || 0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // run only on page/limit change
  useEffect(() => {
    fetchAssets();
  }, [page, limit]);

  // handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // apply filters
  const applyFilters = () => {
    setPage(1); // reset to first page
    fetchAssets();
  };

  // reset filters
  const resetFilters = () => {
    setFilters({ role: "", base: "", status: "", search: "" });
    setPage(1);
    fetchAssets();
  };

  // toggle user status
  const handleToggleStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://servermms.onrender.com/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      toast.success(
        `User ${newStatus ? "activated" : "deactivated"} successfully`
      );

      setAssets((prev) =>
        prev.map((asset) =>
          asset._id === id ? { ...asset, active: newStatus } : asset
        )
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (id) => {
    setOpen(true);
    toast.info(`Edit user ${id}`);
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
          <div className="text-xl font-semibold">Users</div>
          <div className="flex gap-3">
            <div>
              <button
                className="flex gap-2 text-lg border-1 rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]"
                onClick={() => setFilter((prev) => !prev)}
              >
                <FiFilter className="pt-1 h-6 text-[#374151]" />
                <span>Filters</span>
              </button>
            </div>
            <div className="flex">
              <button className="flex gap-2 text-lg border-1 rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
                <GoPlus className="pt-1 h-7" />
                <span>Add Expenditure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters UI */}
        {filter && (
          <div className="flex-row p-3 bg-white rounded-sm mt-5 shadow-sm">
            <div className="text-xl p-3">Filter</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
              <div>
                <label>Role</label>
                <select
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All roles</option>
                  <option value="Admin">Admin</option>
                  <option value="BaseCommander">Base Commander</option>
                  <option value="LogisticsOfficer">Logistics Officer</option>
                </select>
              </div>

              <div>
                <label>Base</label>
                <select
                  name="base"
                  value={filters.base}
                  onChange={handleFilterChange}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All bases</option>
                  <option value="Base Alpha">Base Alpha</option>
                  <option value="Base Bravo">Base Bravo</option>
                  <option value="Base Charlie">Base Charlie</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div>
                <label>Search</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Search by name/email"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="block w-full border rounded-md shadow-sm focus:outline-none"
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

        {/* Table */}
        <div className="mt-4 bg-white border border-gray-200 shadow-md rounded-xl">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="text-[#6b7280]">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      NAME
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      USERNAME
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      EMAIL
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      ROLE
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      BASE
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      STATUS
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
                      <td className="px-4 py-4 font-medium cursor-pointer whitespace-nowrap">
                        {asset.fullName}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {asset.username}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#6b7280]">
                        {asset.email}
                      </td>
                      <td className="p-4 text-xs">
                        <span
                          className={`rounded-full text-center px-2 ${
                            asset.role === "Admin"
                              ? "bg-purple-100 text-purple-900"
                              : asset.role === "BaseCommander"
                              ? "bg-sky-100 text-sky-800"
                              : asset.role === "LogisticsOfficer"
                              ? "bg-green-100 text-green-800"
                              : asset.role === "Training"
                              ? "bg-sky-200 text-sky-900"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {asset.role}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-[#6b7280]">
                        {asset.assignedBase || "N/A"}
                      </td>
                      <td className="text-sm text-[#6b7280]">
                        <span
                          className={`rounded-full text-center px-2 ${
                            asset.active
                              ? "bg-green-200 text-green-900"
                              : "bg-red-200 text-red-900"
                          }`}
                        >
                          {asset.active ? "active" : "inactive"}
                        </span>
                      </td>
                      <td className="flex gap-2 px-4 py-4 font-medium text-sm">
                        <button
                          className="text-blue-600 mr-3 cursor-pointer"
                          onClick={() => handleEdit(asset._id)}
                        >
                          Edit
                        </button>
                        {asset.active ? (
                          <button
                            className="text-[#dc2626] cursor-pointer"
                            onClick={() =>
                              handleToggleStatus(asset._id, !asset.active)
                            }
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            className="text-[#16a34a] cursor-pointer"
                            onClick={() =>
                              handleToggleStatus(asset._id, !asset.active)
                            }
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {open && <Popup setOpen={setOpen} />}

          {/* Pagination */}
          <div className="flex justify-between px-4">
            <div className="flex mt-4">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} results
            </div>
            <div className="flex gap-3">
              <div className="flex mt-4">
                <select
                  id="options"
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

export default Users;
