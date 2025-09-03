import { Link } from "react-router-dom";
import { useState } from "react";
export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: "" },
    { name: "Assets", link: "/assets", icon: "" },
    { name: "Transfer", link: "/transfer", icon: "" },
    { name: "Purchase", link: "/purchase", icon: "" },
    { name: "Assignment", link: "/assignment", icon: "" },
    { name: "Expenditure", link: "/expenditure", icon: "" },
    { name: "Users", link: "/users", icon: "" },
    { name: "Settings", link: "/settings", icon: "" },
  ];
  return (
    <div className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-[#0d1321]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white px-4 py-5 text-lg">
        {/* <img src={Logo} alt="logo" /> */}image
      </div>
      {/* Menu */}
      <div className="flex flex-col  text-white mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            onClick={() => setActive(item.name)}
            to={item.link}
            className={`flex items-center gap-3 ps-2 pe-2 py-2 cursor-pointer transition-all relative
                ${
                  active === item.name
                    ? "bg-[#2E2E48] rounded-sm text-white font-semibold"
                    : "hover:bg-[#2E2E48] hover:rounded-sm hover:text-white hover:font-semibold"
                }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
    </div>
  );
}
