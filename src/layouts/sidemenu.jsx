import { Link } from "react-router-dom";
import { useState } from "react";
export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", link: "/", icon: "" },
    { name: "Administrasi", link: "/ad", icon: "" },
    { name: "Data Master", link: "/dm", icon: "" },
    { name: "Transaksi", link: "/transaction", icon: "" },
    { name: "Laporan", link: "/la", icon: "" },
  ];
  return (
    <div className="hidden lg:block fixed top-0 left-0 h-screen w-57 bg-[#464667]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white px-4 py-5 text-lg">
        {/* <img src={Logo} alt="logo" /> */}image
      </div>
      {/* Menu */}
      <div className="flex flex-col ps-5 text-white mt-10">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            onClick={() => setActive(item.name)}
            to={item.link}
            className={`flex items-center gap-3 ps-5 py-4 cursor-pointer transition-all relative
                ${
                  active === item.name
                    ? "bg-[#2E2E48] rounded-full text-white font-semibold"
                    : ""
                }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="flex justify-center mt-40">
        <button className="flex py-2 gap-3 px-6 bg-white rounded-xl text-black font-semibold">
          {/* <FiLogOut className="mt-1" /> */}
          Logout
        </button>
      </div>
      <p className="mt-5 text-center text-white font-semibold">
        © 2021 SEMPOA ERP
      </p>
    </div>
  );
}
