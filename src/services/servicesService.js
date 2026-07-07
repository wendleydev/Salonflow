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

const COLLECTION = "services";

export async function listServices(ownerId) {
  const q = query(collection(db, COLLECTION), where("ownerId", "==", ownerId));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

export async function createService(ownerId, data) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    ownerId,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateService(id, data) {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteService(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}
