import Layout from "../layouts/main";
import { IoCubeOutline } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoIosTrendingDown } from "react-icons/io";
import PieChart from "../components/piechart";
import { useState } from "react";
import BarChart from "../components/barchart";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [selected, setSelected] = useState("");
  const display_count = [
    {
      name: "Total assets",
      count: "14",
      icon: IoCubeOutline,
      bgcolor: "bg-[#0284c7]",
    },
    {
      name: "Available",
      count: "11,435",
      icon: IoIosTrendingUp,
      bgcolor: "bg-[#16a34a]",
    },
    {
      name: "Assigned",
      count: "0",
      icon: HiOutlineUserGroup,
      bgcolor: "bg-[#eab308]",
    },
    {
      name: "Expended",
      count: "1000",
      icon: IoIosTrendingDown,
      bgcolor: "bg-[#dc2626]",
    },
  ];

  return (
    // dashboard
    <Layout>
      <div className="h-screen flex-row bg-gray-50 p-3 space-y-3 justify-center items-center">
        {/* Top grid */}
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

        {/* Display counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {display_count.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex bg-white p-2 shadow-md rounded-md"
              >
                <div className="p-2">
                  <Icon
                    className={`${item.bgcolor} p-3 h-12 w-12 rounded-md text-white`}
                  />
                </div>
                <div className="flex flex-col p-2">
                  <div className="text-[#6B7280]">{item.name}</div>
                  <div className="text-md">{item.count}</div>
                </div>
              </div>
            );
          })}
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
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Assets Overview
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
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
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
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
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Assets Overview
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
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
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
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
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex grid grid-cols-1  lg:grid-cols-2 gap-3">
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Recent Assignments
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
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
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
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
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-row bg-white p-6 shadow-xl rounded-lg space-y-4">
            <div className="flex justify-between ">
              <div>
                <h2 className="text-lg text-center font-semibold mb-2">
                  Recent Expenditures
                </h2>
              </div>
              <div>
                <Link className="text-[#0284c7]">View all</Link>
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
                      FROM
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                      TO
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
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">vhvh</td>
                    <td className="px-4 py-2">Base Charlie</td>
                    <td className="px-4 py-2">Base Alpha</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">Aug 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
