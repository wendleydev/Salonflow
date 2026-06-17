import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";

const APPOINTMENT_STATUS = {
  PENDING: "pendente",
  COMPLETED: "concluido",
  CANCELLED: "cancelado",
};

const emptyForm = {
  clientId: "",
  serviceId: "",
  dateTime: "",
  notes: "",
};

const statusLabels = {
  [APPOINTMENT_STATUS.PENDING]: "Pendente",
  [APPOINTMENT_STATUS.COMPLETED]: "Concluído",
  [APPOINTMENT_STATUS.CANCELLED]: "Cancelado",
};

const mockClients = [
  { id: "client-1", name: "Marina Souza" },
  { id: "client-2", name: "Carlos Lima" },
  { id: "client-3", name: "Ana Paula" },
];

const mockServices = [
  { id: "service-1", name: "Corte masculino" },
  { id: "service-2", name: "Barba completa" },
  { id: "service-3", name: "Corte + barba" },
  { id: "service-4", name: "Escova e finalização" },
  { id: "service-5", name: "Corte feminino" },
];

const mockAppointments = [
  {
    id: "appointment-1",
    clientId: "client-1",
    serviceId: "service-5",
    dateTime: "2026-06-17T09:00",
    notes: "Cliente prefere atendimento pela manhã.",
    status: APPOINTMENT_STATUS.PENDING,
  },
  {
    id: "appointment-2",
    clientId: "client-2",
    serviceId: "service-3",
    dateTime: "2026-06-17T14:30",
    notes: "",
    status: APPOINTMENT_STATUS.COMPLETED,
  },
  {
    id: "appointment-3",
    clientId: "client-3",
    serviceId: "service-4",
    dateTime: "2026-06-18T11:00",
    notes: "Confirmar horário no dia anterior.",
    status: APPOINTMENT_STATUS.PENDING,
  },
];

function formatDateTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function Appointments() {
  const [form, setForm] = useState(emptyForm);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDate, setFilterDate] = useState("");

  const clientMap = useMemo(
    () => Object.fromEntries(mockClients.map((client) => [client.id, client.name])),
    [],
  );
  const serviceMap = useMemo(
    () =>
      Object.fromEntries(
        mockServices.map((service) => [service.id, service.name]),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return mockAppointments.filter((appointment) => {
      if (
        filterStatus !== "todos" &&
        appointment.status !== filterStatus
      )
        return false;
      if (filterDate && !(appointment.dateTime || "").startsWith(filterDate))
        return false;
      return true;
    });
  }, [filterStatus, filterDate]);

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
        title="Agendamentos"
        description="Organize os horários do salão e acompanhe o status dos atendimentos."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <select
          required
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Cliente *</option>
          {mockClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <select
          required
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Serviço *</option>
          {mockServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          required
          value={form.dateTime}
          onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Observações"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />
        <div className="flex gap-2">
          <Button type="submit">Agendar</Button>
          <Button type="button" variant="ghost" onClick={resetForm}>
            Limpar
          </Button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="todos">Todos os status</option>
          <option value={APPOINTMENT_STATUS.PENDING}>Pendentes</option>
          <option value={APPOINTMENT_STATUS.COMPLETED}>Concluídos</option>
          <option value={APPOINTMENT_STATUS.CANCELLED}>Cancelados</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        {(filterStatus !== "todos" || filterDate) && (
          <Button
            variant="ghost"
            onClick={() => {
              setFilterStatus("todos");
              setFilterDate("");
            }}
          >
            Limpar filtros
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <PageHeader
            title="Nenhum agendamento"
            description="Crie um agendamento ou ajuste os filtros."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((appointment) => (
            <article
              key={appointment.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {clientMap[appointment.clientId] || "Cliente"} -{" "}
                  {serviceMap[appointment.serviceId] || "Serviço"}
                </p>
                <p className="text-sm text-slate-500">
                  {formatDateTime(appointment.dateTime)}
                </p>
                {appointment.notes && (
                  <p className="mt-1 text-sm text-slate-600">
                    {appointment.notes}
                  </p>
                )}
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    appointment.status === APPOINTMENT_STATUS.COMPLETED
                      ? "bg-emerald-100 text-emerald-800"
                      : appointment.status === APPOINTMENT_STATUS.CANCELLED
                        ? "bg-slate-100 text-slate-600"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {statusLabels[appointment.status] || appointment.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {appointment.status === APPOINTMENT_STATUS.PENDING && (
                  <Button variant="primary">Concluir</Button>
                )}
                <Button variant="secondary">Editar</Button>
                <Button variant="danger">Excluir</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
