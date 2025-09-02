import Sidebar from "./sidemenu";
import Naavbars from "./navbar";
function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-cover bg-center bg-no-repeat">
      {/* Sidebar */}
      <Sidebar className="flex" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto ml-0 lg:ml-58">
        <div className="p-0 flex-1 overflow-y-auto">
          <Naavbars />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
