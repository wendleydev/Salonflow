import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import Button from "./Button.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      showToast("Sessão encerrada.");
      navigate("/login");
    } catch (error) {
      showToast(error.message || "Erro ao sair", "error");
    }
  }

  return (
    <header className="flex h-14 items-center justify-between border-b-2 border-brand-gold/40 bg-white px-4 md:px-6">
      <p className="truncate text-sm text-slate-600">
        Olá,{" "}
        <span className="font-semibold text-brand-purple">
          {user?.displayName || user?.email || "Usuário"}
        </span>
      </p>
      <Button variant="secondary" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
}

export default Navbar;
