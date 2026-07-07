import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageHeader from "../components/PageHeader.jsx";
import {
  createDemoAppointment,
  deleteDemoAppointment,
  listDemoAppointments,
  listDemoClients,
  listDemoServices,
  markDemoAppointmentCompleted,
  updateDemoAppointment,
} from "../services/demoDataService.js";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import { listClients } from "../services/clientsService.js";
import { listServices } from "../services/servicesService.js";
import {
  APPOINTMENT_STATUS,
  createAppointment,
  deleteAppointment,
  listAppointments,
  markAppointmentCompleted,
  updateAppointment,
} from "../services/appointmentsService.js";

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

function formatDateTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function Appointments() {
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDate, setFilterDate] = useState("");

  const loadAppointmentsData = useCallback(async function loadAppointmentsData() {
    if (!user) return;
    setLoading(true);

    if (!isAdmin) {
      const [appointmentsData, clientsData, servicesData] = await Promise.all([
        listDemoAppointments(),
        listDemoClients(),
        listDemoServices(),
      ]);

      setAppointments(appointmentsData);
      setClients(clientsData);
      setServices(servicesData);
      setLoading(false);
      return;
    }

    try {
      const [appointmentsData, clientsData, servicesData] = await Promise.all([
        listAppointments(user.uid),
        listClients(user.uid),
        listServices(user.uid),
      ]);

      setAppointments(appointmentsData);
      setClients(clientsData);
      setServices(servicesData);
    } catch (error) {
      showToast(error.message || "Erro ao carregar agendamentos", "error");
    } finally {
      setLoading(false);
    }
  }, [isAdmin, showToast, user]);

  useEffect(() => {
    loadAppointmentsData();
  }, [loadAppointmentsData]);

  const clientMap = useMemo(
    () =>
      Object.fromEntries(clients.map((client) => [client.id, client.name])),
    [clients],
  );
  const serviceMap = useMemo(
    () =>
      Object.fromEntries(
        services.map((service) => [service.id, service.name]),
      ),
    [services],
  );

  const filtered = useMemo(() => {
    return appointments.filter((appointment) => {
      if (
        filterStatus !== "todos" &&
        appointment.status !== filterStatus
      )
        return false;
      if (filterDate && !(appointment.dateTime || "").startsWith(filterDate))
        return false;
      return true;
    });
  }, [appointments, filterStatus, filterDate]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(appointment) {
    setEditingId(appointment.id);
    setForm({
      clientId: appointment.clientId || "",
      serviceId: appointment.serviceId || "",
      dateTime: (appointment.dateTime || "").slice(0, 16),
      notes: appointment.notes || "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const payload = {
      clientId: form.clientId,
      serviceId: form.serviceId,
      dateTime: form.dateTime,
      notes: form.notes.trim(),
    };

    if (!isAdmin) {
      if (editingId) {
        await updateDemoAppointment(editingId, payload);
        showToast("Modo demo: agendamento atualizado apenas neste navegador.");
      } else {
        await createDemoAppointment({
          ...payload,
          status: APPOINTMENT_STATUS.PENDING,
        });
        showToast("Modo demo: agendamento criado apenas neste navegador.");
      }

      resetForm();
      await loadAppointmentsData();
      setSaving(false);
      return;
    }

    try {
      if (editingId) {
        await updateAppointment(editingId, payload);
        showToast("Agendamento atualizado com sucesso!");
      } else {
        await createAppointment(user.uid, {
          ...payload,
          status: APPOINTMENT_STATUS.PENDING,
        });
        showToast("Agendamento criado com sucesso!");
      }

      resetForm();
      await loadAppointmentsData();
    } catch (error) {
      showToast(error.message || "Erro ao salvar agendamento", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleComplete(id) {
    if (!isAdmin) {
      await markDemoAppointmentCompleted(id);
      showToast("Modo demo: agendamento concluído apenas neste navegador.");
      await loadAppointmentsData();
      return;
    }

    try {
      await markAppointmentCompleted(id);
      showToast("Agendamento concluído!");
      await loadAppointmentsData();
    } catch (error) {
      showToast(error.message || "Erro ao concluir agendamento", "error");
    }
  }

  async function handleCancel(id) {
    if (!isAdmin) {
      await updateDemoAppointment(id, { status: APPOINTMENT_STATUS.CANCELLED });
      showToast("Modo demo: agendamento cancelado apenas neste navegador.");
      await loadAppointmentsData();
      return;
    }

    try {
      await updateAppointment(id, { status: APPOINTMENT_STATUS.CANCELLED });
      showToast("Agendamento cancelado.");
      await loadAppointmentsData();
    } catch (error) {
      showToast(error.message || "Erro ao cancelar agendamento", "error");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Excluir este agendamento?")) return;

    if (!isAdmin) {
      await deleteDemoAppointment(id);
      showToast("Modo demo: agendamento removido apenas neste navegador.");
      await loadAppointmentsData();
      return;
    }

    try {
      await deleteAppointment(id);
      showToast("Agendamento excluído com sucesso!");
      await loadAppointmentsData();
    } catch (error) {
      showToast(error.message || "Erro ao excluir agendamento", "error");
    }
  }

  const canCreate = clients.length > 0 && services.length > 0;

  return (
    <div>
      <PageHeader
        title="Agendamentos"
        description="Organize os horários do salão e acompanhe o status dos atendimentos."
      />
      {!isAdmin && (
        <p className="mt-4 rounded-lg bg-sky-50 px-3 py-2 text-sm text-sky-800">
          Ambiente de demonstração: apenas o administrador pode alterar dados
          reais. Suas alterações ficam salvas somente neste navegador.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <select
          required
          value={form.clientId}
          onChange={(e) => setForm({ ...form, clientId: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          disabled={!canCreate}
        >
          <option value="">Cliente *</option>
          {clients.map((client) => (
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
          disabled={!canCreate}
        >
          <option value="">Serviço *</option>
          {services.map((service) => (
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
          disabled={!canCreate}
        />
        <input
          placeholder="Observações"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          disabled={!canCreate}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={saving || !canCreate}>
            {editingId ? "Atualizar" : "Agendar"}
          </Button>
          {editingId && (
            <Button type="button" variant="ghost" onClick={resetForm}>
              Cancelar edição
            </Button>
          )}
        </div>
      </form>

      {!canCreate && !loading && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Cadastre pelo menos um cliente e um serviço antes de criar
          agendamentos.
        </p>
      )}

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

      {loading ? (
        <div className="mt-8 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
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
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleComplete(appointment.id)}
                    >
                      Concluir
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
                <Button
                  variant="secondary"
                  onClick={() => startEdit(appointment)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
