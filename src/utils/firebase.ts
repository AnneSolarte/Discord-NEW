import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, onSnapshot, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import {  Product } from "../types/products";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_zIJkKWOgeTTH-h-Fg1N-XxN8nB1Njyc",
  authDomain: "datanne-22e55.firebaseapp.com",
  projectId: "datanne-22e55",
  storageBucket: "datanne-22e55.appspot.com",
  messagingSenderId: "1035883490519",
  appId: "1:1035883490519:web:4eccde8a2e108c8a46d492"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



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



const addProduct = async (product: Omit<Product, "id">) => {
  try {
    const where = collection(db, "products");
    await addDoc(where, { ...product, createdAt: new Date() });
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};


const getProducts = async () => {
  const q = query(collection(db, "products"), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const transformed: Array<Product> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Product, "id"> = doc.data() as any;
    transformed.push({ id: doc.id, ...data });
  });

  return transformed;
};

const getProductsListener = (cb: (docs: Product[]) => void) => {
  const q = query(collection(db, "products"), orderBy("createdAt")); 
  onSnapshot(q, (collection) => {
    const docs: Product[] = collection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    cb(docs);
  });
};

export {auth}
export {db}
export default {
  addProduct,
  getProducts,
  getProductsListener,
  registerUser,
  loginUser,
  onAuthStateChanged,
};