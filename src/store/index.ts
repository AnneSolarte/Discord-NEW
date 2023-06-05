import Storage, { PersistanceKeys } from "../utils/storage";
import { Actions, AppState, Observer } from "../types/store";
import { reducer } from "./reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Screens } from "../types/navigation";
import { navigate } from "./actions";
import { setUserCredentials } from "./actions";
import { SaveServer } from "./actions";
import { Server } from "../types/servers";



onAuthStateChanged(auth, async (u: any) => {
  console.log('Entra');
  console.log('user', u)
  if (u) {
    u.email !== null ? dispatch(setUserCredentials(u)): '';
    appState.userInfo.uid = u.uid
    appState.userInfo.email = u.email
    const userNameXD = String(u.email).slice(0, -10)
    appState.userInfo.userName = userNameXD


    dispatch(navigate(Screens.HOME));
  } else {
    dispatch(navigate(Screens.DASHBOARD));
  }
});

const emptyState: AppState = {
  Post: [],
  Servers: [ {id: "",
  name: "",
  img: "",
  createdAt: ""} ],
  Friends: [],
  screens: Screens.DASHBOARD,
  user: "",
  userInfo: {
    uid: "",
    userName: "",
    email: "",
    password: "",
    img: "/img/user.png",
  },
};

export let appState = Storage.get<AppState>({
  key: PersistanceKeys.STORE,
  defaultValue: emptyState,
});

let observers: Observer[] = [];

const persistStore = (state: AppState) =>
  Storage.set({ key: PersistanceKeys.STORE, value: state });

const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: Actions) => {
  const clone = JSON.parse(JSON.stringify(appState));
  const newState = reducer(action, clone);
  appState = newState;
  persistStore(newState);
  notifyObservers();
};

export const addObserver = (ref: Observer) => {
  observers = [...observers, ref];
};

