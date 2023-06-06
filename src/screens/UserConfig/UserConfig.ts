import HomeStyle from "./UserConfig.css";

import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { addObserver, appState, dispatch } from "../../store/index";
import { GetUsers, SaveServer, getServer, setUserCredentials } from "../../store/actions";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import {Server} from "../../types/servers"
import firebase from "../../utils/firebase";
import { ConfigDiv, ProfileBar } from "../../components/export";
import EditProfile from "../../components/EditProfile/EditProfile";

const formData: Server = {
  id: "",
  name: "",
  img: "",
  createdAt: "",
};

const serverData: Server = {
  id: "",
  name: "Search",
  img: "/img/Server02.png",
  createdAt: "",
};


export default class UserConfig extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.render();
    await firebase.AddUserDB(appState.userInfo)
    
  }

  logOutUser(){
    if(appState.user !== null || ''){
      localStorage.clear()
      dispatch(setUserCredentials(''));
      appState.user = ""
      appState.Post = []
      appState.Friends = []
      appState.Messages = []
      appState.serverState = {id: "",
      name: "",
      img: "",
      createdAt: ""}
      appState.Servers = []
      appState.userInfo = {
        uid: "",
        userName: "",
        email: "",
        password: "",
        img: "/img/user.png",
      },
      sessionStorage.clear();
      dispatch(navigate(Screens.LOGIN));
      location.reload();
    }
  }

  changeName(e: any) {
    formData.name = e?.target?.value;
  }

  async render() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = HomeStyle;
        this.shadowRoot?.appendChild(css);   
    }

   
    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'

    const config = this.ownerDocument.createElement("config-div") as ConfigDiv;
    section2.appendChild(config)

    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'Section3'

    const barProfile = this.ownerDocument.createElement("profile-bar") as ProfileBar;
    section3.appendChild(barProfile)

    const editP = this.ownerDocument.createElement("edit-profile") as EditProfile;
    section3.appendChild(editP)
    


    const logOut = this.ownerDocument.createElement("button");
    logOut.innerText = "Log Out";
    logOut.className = "ButtonLogOut"
    logOut.addEventListener("click", this.logOutUser)
    section3.appendChild(logOut);

    this.shadowRoot?.appendChild(section3);

  }
}

customElements.define("user-config", UserConfig);
