import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TablesA = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);

  return (
    <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
      <div className="flex justify-between ">
        <div>
          <h2 className="text-lg text-center font-semibold mb-2">
            Assets Overview
          </h2>
        </div>
        <div>
          <Link to="/assignment" className="text-[#0284c7]">
            View all
          </Link>
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
                ASSIGNED TO
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
            {data.map((tdata, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-2">{tdata.assetName}</td>
                  <td className="px-4 py-2">{tdata.assignedTo.name}</td>
                  <td className="px-4 py-2">{tdata.quantity}</td>
                  <td className="px-4 py-2">{tdata.status}</td>
                  <td className="px-4 py-2">{tdata.startDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablesA;
