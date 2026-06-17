import { useState } from "react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

const emptyForm = { name: "", price: "", durationMinutes: "" };

const mockServices = [
  { id: 1, name: "Corte masculino", price: 45, durationMinutes: 30 },
  { id: 2, name: "Barba completa", price: 35, durationMinutes: 25 },
  { id: 3, name: "Corte + barba", price: 75, durationMinutes: 60 },
];

function Services() {
  const [form, setForm] = useState(emptyForm);

  function resetForm() {
    setForm(emptyForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetForm();
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
          <Button type="submit">
            Adicionar
          </Button>
          <Button type="button" variant="ghost" onClick={resetForm}>
            Limpar
          </Button>
        </div>
      </form>

      {mockServices.length === 0 ? (
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
              {mockServices.map((service) => (
                <tr key={service.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{service.name}</td>
                  <td className="px-4 py-3">
                    R$ {Number(service.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{service.durationMinutes} min</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary">Editar</Button>
                      <Button variant="danger">Excluir</Button>
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
