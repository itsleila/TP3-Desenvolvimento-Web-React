import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBmT7XtPs9F4dW0dh10sV2YVVadAI51kGc',
  authDomain: 'tp3-reactweb.firebaseapp.com',
  projectId: 'tp3-reactweb',
  storageBucket: 'tp3-reactweb.appspot.com',
  messagingSenderId: '866854836559',
  appId: '1:866854836559:web:fb95e3c58fee5b178d8d3a',
  measurementId: 'G-X1348LC2GN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

/////////////////////////////////////////////

export async function inserirUsuario(novoUsuario) {
  const docRef = await addDoc(collection(db, 'usuarios'), novoUsuario);
  return docRef.id;
}

export async function listarUsuarios() {
  let retorno;
  await getDocs(collection(db, 'usuarios')).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterUsuario(id) {
  const docRef = doc(db, 'usuarios', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function excluirUsuario(id) {
  await deleteDoc(doc(db, 'usuarios', id));
}

export async function atualizarUsuario(id, usuarioAtualizado) {
  const docRef = doc(db, 'usuarios', id);
  await updateDoc(docRef, usuarioAtualizado);
}

////////////////////////////////////////
