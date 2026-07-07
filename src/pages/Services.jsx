import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import {
  createService,
  deleteService,
  listServices,
  updateService,
} from "../services/servicesService.js";

const emptyForm = { name: "", price: "", durationMinutes: "" };

function Services() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadServices = useCallback(async function loadServices() {
    if (!user) return;
    setLoading(true);

    try {
      const data = await listServices(user.uid);
      setServices(data);
    } catch (error) {
      showToast(error.message || "Erro ao carregar serviços", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast, user]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(service) {
    setEditingId(service.id);
    setForm({
      name: service.name || "",
      price: String(service.price ?? ""),
      durationMinutes: String(service.durationMinutes ?? ""),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      price: Number(form.price) || 0,
      durationMinutes: Number(form.durationMinutes) || 30,
    };

    try {
      if (editingId) {
        await updateService(editingId, payload);
        showToast("Serviço atualizado com sucesso!");
      } else {
        await createService(user.uid, payload);
        showToast("Serviço cadastrado com sucesso!");
      }
      resetForm();
      await loadServices();
    } catch (error) {
      showToast(error.message || "Erro ao salvar serviço", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Excluir este serviço?")) return;

    try {
      await deleteService(id);
      showToast("Serviço excluído com sucesso!");
      await loadServices();
    } catch (error) {
      showToast(error.message || "Erro ao excluir serviço", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Serviços"
        description="Monte a vitrine de serviços oferecidos pelo salão."
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
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Preço (R$)"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Duração (min)"
          type="number"
          min="5"
          value={form.durationMinutes}
          onChange={(e) =>
            setForm({ ...form, durationMinutes: e.target.value })
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
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
      ) : services.length === 0 ? (
        <div className="mt-8">
          <PageHeader
            title="Nenhum serviço"
            description="Cadastre cortes, coloração e outros serviços."
          />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Duração</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{service.name}</td>
                  <td className="px-4 py-3">
                    R$ {Number(service.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{service.durationMinutes} min</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => startEdit(service)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(service.id)}
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

export default Services;
