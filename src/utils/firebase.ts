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
    const main = collection(db, `users/${appState.userInfo.uid}/servers`);
    const docRef = await addDoc(main, { ...server, createdAt: new Date() });
    const serverId = docRef.id;
    
    // Actualiza el campo id del objeto server con el serverId generado
    server.id = serverId;
    
    
    console.log("Server added with ID: ", serverId);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
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
    await addDoc(postCollection, { ...post, createdAt: new Date() });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

const GetPostDB = async (): Promise<Post[]> => {
  try {
    const serverRef = collection(db, `users/${appState.userInfo.uid}/servers`);
    const querySnapshot = await getDocs(serverRef);
    
    const posts: Post[] = [];

    querySnapshot.forEach(async (serverDoc) => {
      const postCollectionRef = collection(serverDoc.ref, "posts");
      const postsSnapshot = await getDocs(postCollectionRef);
      
      postsSnapshot.forEach((postDoc) => {
        const postData = postDoc.data();
        const post: Post = {
          id: postDoc.id,
          img: postData.img,
          title: postData.title,
          message: postData.message,
          createdAt: postData.createdAt,
        };
        posts.push(post);
      });
    });

    return posts;
  } catch (e) {
    console.error("Error getting posts: ", e);
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