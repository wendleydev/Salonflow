const STORAGE_KEY = "salonflow-demo-data";

const initialData = {
  clients: [
    {
      id: "demo-client-1",
      name: "Ana Paula",
      phone: "(11) 99999-0001",
      email: "ana.demo@email.com",
      createdAt: "2026-01-01T10:00:00.000Z",
    },
    {
      id: "demo-client-2",
      name: "Marina Souza",
      phone: "(11) 98888-0002",
      email: "marina.demo@email.com",
      createdAt: "2026-01-02T10:00:00.000Z",
    },
  ],
  services: [
    {
      id: "demo-service-1",
      name: "Corte feminino",
      price: 80,
      durationMinutes: 60,
      createdAt: "2026-01-01T10:00:00.000Z",
    },
    {
      id: "demo-service-2",
      name: "Escova modelada",
      price: 65,
      durationMinutes: 45,
      createdAt: "2026-01-02T10:00:00.000Z",
    },
  ],
  appointments: [
    {
      id: "demo-appointment-1",
      clientId: "demo-client-1",
      serviceId: "demo-service-1",
      dateTime: "2026-07-08T14:00",
      notes: "Cliente prefere atendimento no período da tarde.",
      status: "pendente",
      createdAt: "2026-01-03T10:00:00.000Z",
    },
    {
      id: "demo-appointment-2",
      clientId: "demo-client-2",
      serviceId: "demo-service-2",
      dateTime: "2026-07-09T10:30",
      notes: "",
      status: "concluido",
      createdAt: "2026-01-04T10:00:00.000Z",
    },
  ],
};

function cloneInitialData() {
  return JSON.parse(JSON.stringify(initialData));
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

function readData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const data = cloneInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return JSON.parse(stored);
}

function writeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function sortByName(items) {
  return [...items].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

function sortByDate(items) {
  return [...items].sort((a, b) =>
    (a.dateTime || "").localeCompare(b.dateTime || ""),
  );
}

export async function listDemoClients() {
  return sortByName(readData().clients);
}

export async function createDemoClient(data) {
  const stored = readData();
  const client = {
    ...data,
    id: createId("demo-client"),
    createdAt: new Date().toISOString(),
  };
  stored.clients.push(client);
  writeData(stored);
  return client.id;
}

export async function updateDemoClient(id, data) {
  const stored = readData();
  stored.clients = stored.clients.map((client) =>
    client.id === id ? { ...client, ...data } : client,
  );
  writeData(stored);
}

export async function deleteDemoClient(id) {
  const stored = readData();
  stored.clients = stored.clients.filter((client) => client.id !== id);
  stored.appointments = stored.appointments.filter(
    (appointment) => appointment.clientId !== id,
  );
  writeData(stored);
}

export async function listDemoServices() {
  return sortByName(readData().services);
}

export async function createDemoService(data) {
  const stored = readData();
  const service = {
    ...data,
    id: createId("demo-service"),
    createdAt: new Date().toISOString(),
  };
  stored.services.push(service);
  writeData(stored);
  return service.id;
}

export async function updateDemoService(id, data) {
  const stored = readData();
  stored.services = stored.services.map((service) =>
    service.id === id ? { ...service, ...data } : service,
  );
  writeData(stored);
}

export async function deleteDemoService(id) {
  const stored = readData();
  stored.services = stored.services.filter((service) => service.id !== id);
  stored.appointments = stored.appointments.filter(
    (appointment) => appointment.serviceId !== id,
  );
  writeData(stored);
}

export async function listDemoAppointments() {
  return sortByDate(readData().appointments);
}

export async function createDemoAppointment(data) {
  const stored = readData();
  const appointment = {
    ...data,
    id: createId("demo-appointment"),
    status: data.status || "pendente",
    createdAt: new Date().toISOString(),
  };
  stored.appointments.push(appointment);
  writeData(stored);
  return appointment.id;
}

export async function updateDemoAppointment(id, data) {
  const stored = readData();
  stored.appointments = stored.appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, ...data } : appointment,
  );
  writeData(stored);
}

export async function markDemoAppointmentCompleted(id) {
  await updateDemoAppointment(id, { status: "concluido" });
}

export async function deleteDemoAppointment(id) {
  const stored = readData();
  stored.appointments = stored.appointments.filter(
    (appointment) => appointment.id !== id,
  );
  writeData(stored);
}
