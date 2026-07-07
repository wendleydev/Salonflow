import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import {
  createClient,
  deleteClient,
  listClients,
  updateClient,
} from "../services/clientsService.js";

const emptyForm = { name: "", phone: "", email: "" };

function Clients() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async function load() {
    if (!user) return;
    setLoading(true);
    try {
      setClients(await listClients(user.uid));
    } catch {
      showToast("Erro ao carregar clientes", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast, user]);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(client) {
    setEditingId(client.id);
    setForm({
      name: client.name || "",
      phone: client.phone || "",
      email: client.email || "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateClient(editingId, form);
        showToast("Cliente atualizado");
      } else {
        await createClient(user.uid, form);
        showToast("Cliente cadastrado");
      }
      resetForm();
      await load();
    } catch {
      showToast("Erro ao salvar cliente", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Excluir este cliente?")) return;
    try {
      await deleteClient(id);
      showToast("Cliente excluído");
      await load();
    } catch {
      showToast("Erro ao excluir", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Cadastre, edite e acompanhe os clientes do salão."
      />
      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-4"
      >
        <input
          placeholder="Nome *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-1"
        />
        <input
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-1"
        />
        <input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-1"
        />
        <div className="flex gap-2 md:col-span-1">
          <Button type="submit" disabled={saving}>
            {editingId ? "Atualizar" : "Adicionar"}
          </Button>
          {editingId && (
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : clients.length === 0 ? (
        <div className="mt-8">
          <PageHeader
            title="Nenhum cliente"
            description="Cadastre o primeiro cliente usando o formulário acima."
          />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.phone || "—"}</td>
                  <td className="px-4 py-3">{c.email || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => startEdit(c)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(c.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Clients;
