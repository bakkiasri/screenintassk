import Sidebar from "./sidemenu";
import Naavbars from "./navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-cover bg-center bg-no-repeat">
      {/* Sidebar */}
      <Sidebar className="flex" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64 bg-[#f9fafb]">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 z-50 bg-white shadow">
          <Naavbars />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto md:mt-5 mt-10 md:p-10 p-1 ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
