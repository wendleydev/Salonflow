import { NavLink } from "react-router-dom";
import logo from "../assets/logo_salon.webp";
import Footer from "./Footer.jsx";

const links = [
  { to: "/dashboard", label: "Início", end: true },
  { to: "/dashboard/clientes", label: "Clientes" },
  { to: "/dashboard/servicos", label: "Serviços" },
  { to: "/dashboard/agendamentos", label: "Agendamentos" },
];

function Sidebar() {
  return (
    <aside className="flex w-full flex-col border-b border-brand-dark/10 bg-linear-to-b from-gray-800 to-[#190b2f] text-white md:fixed md:left-0 md:top-0 md:h-screen md:w-56 md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 px-2 py-2">
        <img
          src={logo}
          alt=""
          className="h-18 w-18 object-contain transition-transform duration-300 hover:scale-110"
        />
        <div>
          <p className="text-lg font-bold tracking-tight">SalonFlow</p>
          <p className="text-xs text-brand-gold-light/80">
            Painel administrativo
          </p>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible md:px-3 md:pb-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition md:whitespace-normal ${
                isActive
                  ? "bg-linear-to-r from-brand-purple to-brand-magenta text-white shadow-md"
                  : "text-violet-200 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <Footer className="hidden md:block" />
    </aside>
  );
}

export default Sidebar;
