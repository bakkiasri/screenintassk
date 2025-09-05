import { useState } from "react";
import { Link } from "react-router-dom";

const Tables = ({ data = [], title, tablehead }) => {
  const [loading] = useState(false);

  // Extract headers dynamically but exclude "_id"
  const headers =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "_id") : [];

  // Final headers: use tablehead if provided, else fallback to headers
  const finalHeaders = tablehead?.length ? tablehead : headers;

  // ✅ Helper to safely format any cell value
  const formatCellValue = (val) => {
    if (val === null || val === undefined) return "-";

    if (typeof val === "object") {
      // If it's a nested object, show its key-values neatly
      if (Array.isArray(val)) {
        return val.length > 0
          ? val.map((item, i) => <div key={i}>{formatCellValue(item)}</div>)
          : "-";
      }

      return Object.keys(val).length > 0
        ? Object.entries(val).map(([k, v]) => (
            <div key={k}>
              <span className="font-medium">{k}:</span> {formatCellValue(v)}
            </div>
          ))
        : "-";
    }

    return String(val); // numbers, strings, booleans
  };

  return (
    <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg text-center font-semibold mb-2">{title}</h2>
        <Link className="text-[#0284c7]">View all</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px]">
          <thead className="border-b border-gray-200">
            <tr className="p-2 text-[#6b7280]">
              {finalHeaders.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                >
                  {key.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-[#6b7280]">
            {data.map((row, idx) => (
              <tr key={row._id || idx}>
                {headers.map((key) => (
                  <td key={key} className="px-4 py-2">
                    {formatCellValue(row[key])}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={finalHeaders.length || 1}
                  className="text-center py-4 text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
