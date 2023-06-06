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
import { Message } from "../types/message";

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

const EditUserDB = async (user: any) =>{
  try {
    await setDoc (doc(db, "users", user.uid), user)
    return true
  } catch (e) {
    console.error("Error editing document: ", e);
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

const SaveMessageDB = async (message: Message, serverId: string) => {
  try {
    const serverRef = doc(db, `users/${appState.userInfo.uid}/servers/${serverId}`);
    const messCollection = collection(serverRef, "messages");

    // Guardar el post en Firestore sin un ID
    const docRef = await addDoc(messCollection, { ...message, createdAt: new Date() });

    // Obtener el ID generado automáticamente
    const messId = docRef.id;

    // Actualizar el appState con el ID del post
    const updatedMess = { ...message, id: messId };
    appState.Messages.push(updatedMess);

    // Actualizar el documento en Firestore con el ID del post
    await setDoc(docRef, updatedMess);

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};


const GetMessagesDB = async (serverId: string): Promise<Message[]> => {
  try {
    const messCollection = collection(db,`users/${appState.userInfo.uid}/servers/${serverId}/messages`);
    const q = query(messCollection);
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];

    querySnapshot.forEach((doc) => {
      const MessData = doc.data();
      const mess: Message = {
        id: doc.id, // Obtener el ID del post desde Firestore
        img: MessData.img,
        Username: MessData.Username,
        userImg: MessData.userImg,
        message: MessData.message,
        createdAt: MessData.createdAt,
      };
      messages.push(mess);
    });

    return messages;
  } catch (error) {
    console.error("Error getting messages: ", error);
    return [];
  }
};

const AddFriendDB = async (friend: User) =>{
  try {
    const main = collection(db, `users/${appState.userInfo.uid}/friends`)
    await addDoc(main,{...friend, createdAt: new Date()});
    return true
  } catch (e) {
    console.error("Error adding document: ", e);
    return false
  }
}


async function getUsersDB() {
  const usersRef = collection(db, "users");

  try {
    const snapshot = await getDocs(usersRef);
    const users: User[] = [];
    snapshot.forEach((doc) => {
      const user = doc.data() as User;
      user.uid = doc.id; // Utiliza el ID del documento como ID del usuario
      users.push(user);
    });
    return users;
  } catch (error) {
    console.error("Error getting users from Firebase:", error);
    return [];
  }
}

const GetFriendsDB = async(): Promise<User[]> =>{
  const resp: User[] = [];

  const q=query(collection(db,`users/${appState.userInfo.uid}/friends`), orderBy("createdAt"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    resp.push({
      ...doc.data()
    }as User)
  });
  return resp
}

export {auth}
export {db}
export default {
  SaveServerDB,
  GetServerDB,
  SavePostDB,
  GetPostDB,
  SaveMessageDB,
  GetMessagesDB,
  AddFriendDB,
  GetFriendsDB,
  registerUser,
  loginUser,
  onAuthStateChanged,
  uploadFile,
  getFile,
  AddUserDB,
  getUsersDB,
  EditUserDB
};