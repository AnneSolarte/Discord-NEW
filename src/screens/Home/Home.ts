import HomeStyle from "./Home.css";

import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { TextCanalDiv } from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import { SaveServer, getServer, setUserCredentials } from "../../store/actions";
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

  logOutUser(){
    if(appState.user !== null || ''){
      localStorage.clear()
      dispatch(setUserCredentials(''));
      appState.user = ""
      appState.Post = []
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

    const capa = this.ownerDocument.createElement("section")
    capa.className = 'capa'
    this.shadowRoot?.appendChild(capa);

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const iconHome = this.ownerDocument.createElement("img")
    iconHome.className = "Icon"
    iconHome.src= "/img/Server0.png"
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
      dispatch(navigate(Screens.POST))
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

    const logOut = this.ownerDocument.createElement("button");
    logOut.innerText = "Log Out";
    logOut.className = "ButtonLogOut"
    logOut.addEventListener("click", this.logOutUser)
    section3.appendChild(logOut);

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
      dispatch(await SaveServer(formData))
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

customElements.define("my-home", Home);
