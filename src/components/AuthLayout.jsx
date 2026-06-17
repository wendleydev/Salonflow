import { Link } from "react-router-dom";
import logo from "../assets/logo_salon.webp";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand-dark/10 via-white to-brand-gold/10 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/login" className="inline-flex flex-col items-center gap-2">
            <img
              src={logo}
              alt="SalonFlow"
              className="h-20 w-auto transition-transform duration-300 hover:scale-110"
            />
            <span className="bg-linear-to-r from-brand-dark via-brand-magenta to-brand-gold bg-clip-text text-2xl font-bold text-transparent">
              SalonFlow
            </span>
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
