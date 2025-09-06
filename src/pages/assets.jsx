import { useState, useEffect } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // rows per page
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchAssets = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No token found. Please login first.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://servermms.onrender.com/api/assets?sortBy=name&sortOrder=asc&limit=${limit}&skip=${
            (page - 1) * limit
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch assets data");

        const data = await res.json();
        setAssets(data.assets || []);
        setTotal(data.total || 0); // backend should return total count
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [page, limit]);
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
      <div className="flex-row mt-5 justify-center items-center">
        <div className="flex justify-between">
          <div className="text-lg">Asset</div>
          <div className="flex gap-3">
            {/* Filter Button */}
            <div>
              <button className="flex gap-2 text-lg border-1 rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]">
                <FiFilter className="pt-1 h-6 text-[#374151]" />
                <span>Filters</span>
              </button>
            </div>
            {/* Add Asset Button */}
            <div className="flex">
              <button className="flex gap-2 text-lg border-1 rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
                <GoPlus className="pt-1 h-7" />
                <span>Add Asset</span>
              </button>
            </div>
          </div>
        </div>

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
                      TYPE
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      BASE
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      AVAILABLE
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      ASSIGNED
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      STATUS
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-medium">
                      ACTIONS
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
                          {asset.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6b7280]">
                          {asset.type}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6b7280]">
                          {asset.base}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6b7280]">
                          {asset.available}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6b7280]">
                          {asset.assigned}
                        </td>
                        <td className="px-4 py-4">
                          {asset.available > asset.assigned ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Sufficient
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Insufficient
                            </span>
                          )}
                        </td>
                        <td className="flex px-4 py-4 gap-6 text-sm">
                          <button className="text-[#0284c7] hover:underline">
                            View
                          </button>
                          <button className="text-[#2563eb] hover:underline">
                            Edit
                          </button>
                          <button className="text-[#DC2626] hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-500"
                      >
                        No assets found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between px-4">
            <div className="flex mt-4">Showing 11 to 14 of 14 results</div>
            <div className="flex gap-3">
              <div className="flex mt-4">
                <select
                  id="options"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="block w-full  border hover:border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none  focus:border-none"
                >
                  <option value="10">10 per page</option>
                  <option value="25">20 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 ">
                <button
                  className="px-3 py-1 rounded-l-md border  disabled:opacity-50"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border  ${
                      page === i + 1
                        ? "bg-[#f0f9ff] text-[#0284c7] border-1 border-[#0284c7]"
                        : "border-1 border-[#d1d5db] text-[#6b7280]"
                    }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-3 py-1 border rounded-r-md  disabled:opacity-50"
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

export default Assets;
