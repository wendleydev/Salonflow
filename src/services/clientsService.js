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

const COLLECTION = "clients";

export async function listClients(ownerId) {
  const q = query(collection(db, COLLECTION), where("ownerId", "==", ownerId));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

export async function createClient(ownerId, data) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    ownerId,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateClient(id, data) {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteClient(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}
