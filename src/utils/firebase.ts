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