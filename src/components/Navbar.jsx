import Button from "../components/Button";

function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b-2 border-brand-gold/40 bg-white px-4 md:px-6">
      <p className="truncate text-sm text-slate-600">Olá, User</p>
      <Button>Sair</Button>
    </header>
  );
}

export default Navbar;
