import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col md:ml-56">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
        <Footer variant="page" className="md:hidden" />
      </div>
    </div>
  );
}

export default DashboardLayout;
