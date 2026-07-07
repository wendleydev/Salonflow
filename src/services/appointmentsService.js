import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config.js";

const COLLECTION = "appointments";

export const APPOINTMENT_STATUS = {
  PENDING: "pendente",
  COMPLETED: "concluido",
  CANCELLED: "cancelado",
};

export async function listAppointments(ownerId) {
  const q = query(collection(db, COLLECTION), where("ownerId", "==", ownerId));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.dateTime || "").localeCompare(b.dateTime || ""));
}

export async function createAppointment(ownerId, data) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    ownerId,
    status: data.status || APPOINTMENT_STATUS.PENDING,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateAppointment(id, data) {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function markAppointmentCompleted(id) {
  await updateDoc(doc(db, COLLECTION, id), {
    status: APPOINTMENT_STATUS.COMPLETED,
  });
}

export async function deleteAppointment(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}
