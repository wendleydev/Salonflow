import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../hooks/useAuth.js";

function NotFound() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  function handleGoBack() {
    navigate(user ? "/dashboard" : "/login", { replace: true });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand-dark/10 via-white to-brand-gold/10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand-dark/10 via-white to-brand-gold/10 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-purple">
          Erro 404
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          A rota que você tentou acessar não existe ou pode ter sido movida.
          Volte para uma área segura do SalonFlow e continue navegando.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={handleGoBack}>
            {user ? "Voltar ao dashboard" : "Ir para o login"}
          </Button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
