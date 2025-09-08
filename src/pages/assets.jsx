import { useState, useEffect } from "react";
import Layout from "../layouts/main";
import { FiFilter } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // rows per page
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(false);

  // Filter states
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
        sortBy: "name",
        sortOrder: "asc",
        limit,
        skip: (page - 1) * limit,
      });

      if (selectedBase) queryParams.append("base", selectedBase);
      if (selectedAssetType) queryParams.append("type", selectedAssetType);
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(
        `https://servermms.onrender.com/api/assets?${queryParams.toString()}`,
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
      setTotal(data.total || 0);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch only when page or limit changes
  useEffect(() => {
    fetchAssets();
  }, [page, limit]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-4xl font-semibold text-black">Loading...</p>
      </div>
    );
  }

  // Dynamic result range
  const startResult = (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, total);

  // Reset Filters
  const handleReset = () => {
    setSelectedBase("");
    setSelectedAssetType("");
    setSearchQuery("");
    setPage(1);
    fetchAssets(); // reload after reset
  };

  return (
    <Layout>
      <div className="flex-row mt-5 justify-center items-center">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">Assets</div>
          <div className="flex gap-3">
            {/* Filter Button */}
            <div>
              <button
                onClick={() => setFilter((prev) => !prev)}
                className="flex gap-2 text-lg border rounded-md p-2 bg-white text-[#374151] border-[#d1d5db]"
              >
                <FiFilter className="pt-1 h-6 text-[#374151]" />
                <span>Filters</span>
              </button>
            </div>

            {/* Add Asset Button */}
            <div className="flex">
              <button className="flex gap-2 text-lg border rounded-md p-2 bg-[#0284c7] text-white border-[#d1d5db]">
                <GoPlus className="pt-1 h-7" />
                <span>Add Asset</span>
              </button>
            </div>
          </div>
        </div>

        {filter && (
          <div className="flex-row p-3 bg-white rounded-sm mt-5 shadow-sm">
            <div className="text-xl p-3">Filter</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
              <div className="flex-row ">
                <div>Base</div>
                <div>
                  <select
                    id="base"
                    value={selectedBase}
                    onChange={(e) => setSelectedBase(e.target.value)}
                    className="block w-full border rounded-md shadow-sm focus:outline-none"
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
                    className="block w-full border rounded-md shadow-sm focus:outline-none"
                  >
                    <option value="">All asset types</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Ammunition">Ammunition</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Search Filter */}
              <div className="flex-row ">
                <div>Search</div>
                <div>
                  <input
                    type="text"
                    placeholder="search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full border rounded-md shadow-sm focus:outline-none"
                  />
                </div>
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
                  setPage(1); // reset to first page
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

export default Assets;
