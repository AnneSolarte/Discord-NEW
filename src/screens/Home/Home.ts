import HomeStyle from "./Home.css";

import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { Friends, ServersSect, TextCanalDiv } from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import {Server} from "../../types/servers"
import firebase from "../../utils/firebase";
import { GetFriends } from "../../store/actions";

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
    if(appState.Friends.length === 0){
      dispatch( await GetFriends())
      this.render();
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

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersDiv = this.ownerDocument.createElement("servers-sect") as ServersSect;
    section1.appendChild(ServersDiv)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)

    const Friends = this.ownerDocument.createElement("section")
    Friends.className = "FriendsSection"

    appState.Friends.forEach((p) => {
      const FriendsDiv = this.ownerDocument.createElement("section");
      FriendsDiv.className = "FriendsDiv";

      const uImg = this.ownerDocument.createElement("img");
      uImg.className = "friendsImg";
      uImg.src = p.img;

      const userN = this.ownerDocument.createElement("p");
      userN.className = "FriendsName";
      userN.innerText = p.userName;

      FriendsDiv.appendChild(uImg)
      FriendsDiv.appendChild(userN)
      Friends.appendChild(FriendsDiv)
    });

    section2.appendChild(Friends)
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
