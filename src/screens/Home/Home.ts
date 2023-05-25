import HomeStyle from "./Home.css";
import Servers, { ServerAtt } from "../../components/Servers/Servers";
import FriendsOnline, { FriendsOnAtt } from "../../components/FriendsOnline/FriendsOnline";
import Friends, { FriendsAtt } from "../../components/Friends/Friends";
import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import {CheckBoxText} from "../../components/export";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { TextCanalDiv } from "../../components/export";
import {ForumCanalDiv} from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import { setUserCredentials } from "../../store/actions";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";

export default class Home extends HTMLElement {
  ServersList: Servers[] = [];
  FriendsList: Friends[] = [];
  FriendsOnList: FriendsOnline[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  logOutUser(){
    if(appState.user !== null || ''){
      dispatch(setUserCredentials(''));
      sessionStorage.clear();
      dispatch(navigate(Screens.LOGIN));
      location.reload();
    }
  }

  BackWindow(){

  }

  CreateChannel(){

  }

  render() {
    
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

    const servers = this.ownerDocument.createElement("section")
    servers.className = 'servers'
    section1.appendChild(servers)

    const iconAdd = this.ownerDocument.createElement("img")
    iconAdd.className = "Icon"
    iconAdd.src = "/img/Server01.png"
    iconAdd.addEventListener("click", () =>{
      console.log("Mostrando")
      CreateChannelPop.style.display = 'flex';
      capa.style.display = "flex"
    })
    section1.appendChild(iconAdd)

    const iconSearch = this.ownerDocument.createElement("img")
    iconSearch.className = "Icon"
    iconSearch.src= "/img/Server02.png"
    section1.appendChild(iconSearch)


    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)
    this.shadowRoot?.appendChild(section2);

    

    const ServersCards = this.ownerDocument.createElement("div")
    ServersCards.className = 'ServerSection'
    this.ServersList.forEach((ServersCard) => {
        ServersCards.appendChild(ServersCard)
    });
    section1.appendChild(ServersCards)
    this.shadowRoot?.appendChild(section1);

    const FriendsCards = this.ownerDocument.createElement("div")
    FriendsCards.className = 'FriendSection'
    this.FriendsList.forEach((FriendsCard) => {
        FriendsCards.appendChild(FriendsCard)
    });
    this.shadowRoot?.appendChild(FriendsCards);

    const FriendsOnCards = this.ownerDocument.createElement("div")
    FriendsOnCards.className = 'FriendOnSection'
    this.FriendsOnList.forEach((FriendsOnCard) => {
        FriendsOnCards.appendChild(FriendsOnCard)
    });
    this.shadowRoot?.appendChild(FriendsOnCards);

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
    tittle.textContent = "Create Channel"
    CreateChannelPop.appendChild(tittle)

    const text = this.ownerDocument.createElement("p")
    text.textContent = "Select a type of channel to create and enjoy"
    CreateChannelPop.appendChild(text)

    const channels = this.ownerDocument.createElement("section")
    channels.className = 'channels'

    const channelText = this.ownerDocument.createElement("section")
    channelText.className = 'channelText'
  
    const TextCanalDiv = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    channelText.appendChild(TextCanalDiv);

    const checkboxText = this.ownerDocument.createElement("checkbox-text") as CheckBoxText;
    channelText.appendChild(checkboxText);

    channels.appendChild(channelText);

    const ForumCanalDiv = this.ownerDocument.createElement("forum-canal") as ForumCanalDiv;
    channels.appendChild(ForumCanalDiv);

    CreateChannelPop.appendChild(channels)

    const channelName = this.ownerDocument.createElement("input")
    channelName.type = "text"
    channelName.className = "ChannelNameInput"
    channelName.placeholder = "Channel Name"
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
    DoneButton.addEventListener("click", this.CreateChannel)
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
