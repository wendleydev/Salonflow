import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../hooks/useAuth.js";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner label="Carregando sessão..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
