import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, onSnapshot, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

import {  Product } from "../types/products";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "firebase/auth";
import { Server } from "../types/servers";

const firebaseConfig = {
  apiKey: "AIzaSyCwvZQAdJoW9EkcIsAK1K3nb8oLFhYP4oE",
  authDomain: "data-disc.firebaseapp.com",
  projectId: "data-disc",
  storageBucket: "data-disc.appspot.com",
  messagingSenderId: "876012131135",
  appId: "1:876012131135:web:6e5bfa12f0586c4a2a398a",
  measurementId: "G-NS7YJQP8MY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage()

const uploadFile = async (file: File) => {
  const storageRef = ref(storage, file.name);
  const res = await uploadBytes(storageRef, file);
  console.log("file uploaded", res);
};

const getFile = async (name: string) => {
  let urlimg = '';

  await getDownloadURL(ref(storage, name))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    urlimg = url;
  
  })
  .catch((error) => {
    // Handle any errors
  });

  console.log(urlimg);
  return urlimg;
}


const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log("ERROR AL REGISTRAR")
    return false;
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};


const SaveServerDB = async (product: Omit<Server, "id">) => {
  try {
    const where = collection(db, "servers");
    await addDoc(where, { ...product, createdAt: new Date() });
    console.log("se añadió servidor con éxito");
  } catch (error) {
    console.error(error);
  }
};


const GetServerDB = async () => {
  const q = query(collection(db, "products"), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const transformed: Array<Server> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Server, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getServersListener = (cb: (docs: Server[]) => void) => {
  const q = query(collection(db, "servers"), orderBy("createdAt")); 
  onSnapshot(q, (collection) => {
    const docs: Server[] = collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Server[];
    cb(docs);
  });
};

export {auth}
export {db}
export default {
  SaveServerDB,
  GetServerDB,
  getServersListener,
  registerUser,
  loginUser,
  onAuthStateChanged,
  uploadFile,
  getFile
};