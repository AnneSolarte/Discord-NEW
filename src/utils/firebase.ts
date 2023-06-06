import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, onSnapshot, addDoc, getDocs, query, orderBy, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { appState } from "../store";

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
import { Post } from "../types/post";
import { User } from "../types/user";

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

const AddUserDB = async (user: User) =>{
  try {
    await setDoc(doc(db, "users", user.uid), user)
    return true
  } catch (e) {
    console.error("Error adding document: ", e);
    return false
  }
}

const SaveServerDB = async (server: Server) => {
  try {
    const serverRef = collection(db, `users/${appState.userInfo.uid}/servers`);
    const newServerRef = doc(serverRef);

    // Generar el ID del servidor
    const serverId = newServerRef.id;

    // Obtener la fecha actual como una cadena de texto en formato ISO
    const createdAt = new Date().toISOString();

    // Guardar el servidor en la base de datos con el ID generado
    await setDoc(newServerRef, { ...server, id: serverId, createdAt });

    // Actualizar el appState con el ID del servidor
    appState.Servers.push({ ...server, id: serverId, createdAt });

    return true;
  } catch (error) {
    console.error("Error adding server: ", error);
    return false;
  }
};

const GetServerDB = async (): Promise<Server[]> => {
  try {
    const main = collection(db, `users/${appState.userInfo.uid}/servers`);
    const querySnapshot = await getDocs(main);

    const servers: Server[] = [];

    querySnapshot.forEach((doc) => {
      const server = { id: doc.id, ...doc.data() } as Server;
      servers.push(server);
    });

    return servers;
  } catch (e) {
    console.error("Error getting servers: ", e);
    return [];
  }
};

const SavePostDB = async (post: Post, serverId: string) => {
  try {
    const serverRef = doc(db, `users/${appState.userInfo.uid}/servers/${serverId}`);
    const postCollection = collection(serverRef, "posts");

    // Guardar el post en Firestore sin un ID
    const docRef = await addDoc(postCollection, { ...post, createdAt: new Date() });

    // Obtener el ID generado automáticamente
    const postId = docRef.id;

    // Actualizar el appState con el ID del post
    const updatedPost = { ...post, id: postId };
    appState.Post.push(updatedPost);

    // Actualizar el documento en Firestore con el ID del post
    await setDoc(docRef, updatedPost);

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};


const GetPostDB = async (serverId: string): Promise<Post[]> => {
  try {
    const postCollection = collection(db,`users/${appState.userInfo.uid}/servers/${serverId}/posts`);
    const q = query(postCollection);
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const post: Post = {
        id: doc.id, // Obtener el ID del post desde Firestore
        img: postData.img,
        title: postData.title,
        message: postData.message,
        createdAt: postData.createdAt,
      };
      posts.push(post);
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts: ", error);
    return [];
  }
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
  SavePostDB,
  GetPostDB,
  getServersListener,
  registerUser,
  loginUser,
  onAuthStateChanged,
  uploadFile,
  getFile,
  AddUserDB
};