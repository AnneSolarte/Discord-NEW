import AddFriendsStyle from "./AddFriends.css";

import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { Friends, TextCanalDiv } from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import { SaveServer, getServer, setUserCredentials } from "../../store/actions";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import {Server} from "../../types/servers"
import Servers from "../../components/Servers/Servers"
import firebase from "../../utils/firebase";
import storage from "../../utils/storage";
import Users from "../../components/Users/Users";

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


export default class AddFriends extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
    
  }

  changeName(e: any) {
    formData.name = e?.target?.value;
  }

  async render() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = AddFriendsStyle;
        this.shadowRoot?.appendChild(css);   
    }

    const capa = this.ownerDocument.createElement("section")
    capa.className = 'capa'
    this.shadowRoot?.appendChild(capa);

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const iconHome = this.ownerDocument.createElement("img")
    iconHome.className = "Icon"
    iconHome.src= "/img/Server0.png"
    iconHome.addEventListener("click", () =>{
      dispatch(navigate(Screens.HOME))
    })
    section1.appendChild(iconHome)

    const iconAdd = this.ownerDocument.createElement("img")
    iconAdd.className = "Icon"
    iconAdd.src = "/img/Server01.png"
    iconAdd.addEventListener("click", () =>{
      CreateChannelPop.style.display = 'flex';
      capa.style.display = "flex"
    })
    section1.appendChild(iconAdd)

    const servers = this.ownerDocument.createElement("my-servers") as Servers;
    section1.appendChild(servers)
    
    const iconSearch = this.ownerDocument.createElement("img")
    iconSearch.className = "Icon"
    iconSearch.src= "/img/Server02.png"
    iconSearch.addEventListener("click", () =>{
      dispatch(navigate(Screens.AddFRIENDS))
    })
    section1.appendChild(iconSearch)

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)



    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'Section3'
    
    const friendsOnDiv = this.ownerDocument.createElement("friends-ondiv") as FriendsOnDiv;
    section3.appendChild(friendsOnDiv)


    const usersList = this.ownerDocument.createElement("users-storage") as Users;
    section3.appendChild(usersList)

    //CreateChannelPopUp
    const CreateChannelPop = this.ownerDocument.createElement("section")
    CreateChannelPop.className = 'CreateChannelPop'

    const tittle = this.ownerDocument.createElement("h1")
    tittle.textContent = "Create Server"
    CreateChannelPop.appendChild(tittle)

    const text = this.ownerDocument.createElement("p")
    text.textContent = "Choose a image and name"
    CreateChannelPop.appendChild(text)

    const channels = this.ownerDocument.createElement("section")
    channels.className = 'channels'

    const channelText = this.ownerDocument.createElement("section")
    channelText.className = 'channelText'
  
    const TextCanalDiv = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    channelText.appendChild(TextCanalDiv);

    const inputImg = this.ownerDocument.createElement("input")
    inputImg.type = "file"
    inputImg.placeholder = "Choose image"
    inputImg.addEventListener("change", async () =>{
      const file = inputImg.files?.[0];
      if (file) await firebase.uploadFile(file);
      console.log(file?.name);
      if (file) {
        const img = await firebase.getFile(file.name);
        console.log("img", img);
        const src = String(img)
        formData.img = src
    }
    });


    CreateChannelPop.appendChild(inputImg)


    this.shadowRoot?.appendChild(section1);
    CreateChannelPop.appendChild(channels)

    const channelName = this.ownerDocument.createElement("input")
    channelName.type = "text"
    channelName.className = "ChannelNameInput"
    channelName.placeholder = "Channel Name"
    channelName.addEventListener("change", this.changeName);
    CreateChannelPop.appendChild(channelName);

    const buttons = this.ownerDocument.createElement("section")
    buttons.className = 'buttons'
    
    const CancelButton = this.ownerDocument.createElement("button");
    CancelButton.innerText = "Cancel";
    CancelButton.className = "CancelButton"
    CancelButton.addEventListener("click", () =>{
        CreateChannelPop.style.display = 'none';
        capa.style.display = "none"
    })
    buttons.appendChild(CancelButton);

    const DoneButton = this.ownerDocument.createElement("button");
    DoneButton.innerText = "Done";
    DoneButton.className = "DoneButton"
    DoneButton.addEventListener("click", async () => {
      CreateChannelPop.style.display = 'none';
      capa.style.display = "none"
    })
    buttons.appendChild(DoneButton);
    
    CreateChannelPop.appendChild(buttons)

    

    this.shadowRoot?.appendChild(CreateChannelPop);
    this.shadowRoot?.appendChild(section3);
    

    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);
  }
}

customElements.define("add-friends", AddFriends);
