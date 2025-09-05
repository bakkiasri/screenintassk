import { Link } from "react-router-dom";
import { useState } from "react";
import { RxHome } from "react-icons/rx";
import { IoCubeOutline } from "react-icons/io5";
import { HiOutlineTruck } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: RxHome },
    { name: "Assets", link: "/assets", icon: IoCubeOutline },
    { name: "Transfer", link: "/transfer", icon: HiOutlineTruck },
    { name: "Purchase", link: "/purchase", icon: HiOutlineShoppingCart },
    { name: "Assignment", link: "/assignment", icon: HiOutlineUserGroup },
    { name: "Expenditure", link: "/expenditure", icon: HiOutlineArchiveBox },
    { name: "Users", link: "/users", icon: HiOutlineUsers },
    { name: "Settings", link: "/settings", icon: IoSettingsOutline },
  ];
  return (
    <div className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-[#0d1321]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white px-4 py-1 text-xl font-bold">
        {/* <img src={Logo} alt="logo" /> */}Military Asset Management
      </div>
      {/* Menu */}
      <div className="flex flex-col  text-white mt-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center gap-3 ps-4 pe-2 py-2 text-[#d1d5db] cursor-pointer transition-all relative
                ${
                  active === item.name
                    ? "bg-[#2E2E48] rounded-sm text-white font-semibold"
                    : "hover:bg-[#2E2E48] hover:rounded-sm  hover:text-white hover:font-semibold"
                }`}
              onClick={() => setActive(item.name)}
            >
              <span className="text-lg  ">
                <Icon />
              </span>
              <span className=" ">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
    </div>
  );
}
