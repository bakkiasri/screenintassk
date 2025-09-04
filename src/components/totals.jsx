import { IoIosTrendingUp } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoIosTrendingDown } from "react-icons/io";
import { IoCubeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
function Totals({ data }) {
  const summary = data?.summary || {};
  const display_count = [
    {
      name: "Total assets",
      count: summary.totalAssets || 0,
      icon: IoCubeOutline,
      bgcolor: "bg-[#0284c7]",
    },
    {
      name: "Available",
      count: summary.totalAvailable || 0,
      icon: IoIosTrendingUp,
      bgcolor: "bg-[#16a34a]",
    },
    {
      name: "Assigned",
      count: summary.totalAssigned || 0,
      icon: HiOutlineUserGroup,
      bgcolor: "bg-[#eab308]",
    },
    {
      name: "Expended",
      count: summary.totalExpended || 0,
      icon: IoIosTrendingDown,
      bgcolor: "bg-[#dc2626]",
    },
  ];

  return (
    <>
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
    </>
  );
}
export default Totals;
