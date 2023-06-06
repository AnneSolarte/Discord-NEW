import HomeStyle from "./Home.css";

import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { Friends, ServersSect, TextCanalDiv } from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import { GetUsers, SaveServer, getServer, setUserCredentials } from "../../store/actions";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import {Server} from "../../types/servers"
import Servers from "../../components/Servers/Servers"
import firebase from "../../utils/firebase";
import storage from "../../utils/storage";

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


export default class Home extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.render();
    await firebase.AddUserDB(appState.userInfo)
    
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

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersDiv = this.ownerDocument.createElement("servers-sect") as ServersSect;
    section1.appendChild(ServersDiv)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)

    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'Section3'
    const friendsOnDiv = this.ownerDocument.createElement("friends-ondiv") as FriendsOnDiv;
    section3.appendChild(friendsOnDiv)

    this.shadowRoot?.appendChild(section3);
    
    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);
  }
}

customElements.define("my-home", Home);
