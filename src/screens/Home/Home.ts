import HomeStyle from "./Home.css";
import Servers, { ServerAtt } from "../../components/Servers/Servers";
import FriendsOnline, { FriendsOnAtt } from "../../components/FriendsOnline/FriendsOnline";
import Friends, { FriendsAtt } from "../../components/Friends/Friends";
import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
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

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = HomeStyle;
        this.shadowRoot?.appendChild(css);

        

    }

    //appState.servers.forEach((data) => {
        //const ServersCard = this.ownerDocument.createElement("my-servers") as Servers;
        //ServersCard.setAttribute(ServerAtt.img, data.img);
        //ServersCard.addEventListener("click", () => {
          //dispatch(navigate(Screens.SERVERS));
        //});
        //this.ServersList.push(ServersCard);
    //});

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)
    this.shadowRoot?.appendChild(section2);

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersCards = this.ownerDocument.createElement("div")
    ServersCards.className = 'ServerSection'
    this.ServersList.forEach((ServersCard) => {
        ServersCards.appendChild(ServersCard)
    });
    section1.appendChild(ServersCards)
    this.shadowRoot?.appendChild(section1);

    //appState.friends.forEach((data) => {
        //const FriendsCard = this.ownerDocument.createElement("my-friends") as Friends;
        //FriendsCard.setAttribute(FriendsAtt.img, data.img);
        //FriendsCard.setAttribute(FriendsAtt.name, data.name);
        //FriendsCard.setAttribute(FriendsAtt.mood, data.mood);
        //this.FriendsList.push(FriendsCard);
    //});

    const FriendsCards = this.ownerDocument.createElement("div")
    FriendsCards.className = 'FriendSection'
    this.FriendsList.forEach((FriendsCard) => {
        FriendsCards.appendChild(FriendsCard)
    });
    this.shadowRoot?.appendChild(FriendsCards);

    //const DataFriendsOnline = appState.friends.filter((user)=>{
        //return user.mood === "online"
    //})

    //DataFriendsOnline.forEach((data) => {
      //const FriendsOnCard = this.ownerDocument.createElement("friends-online") as FriendsOnline;
          //FriendsOnCard.setAttribute(FriendsOnAtt.img, data.img);
          //FriendsOnCard.setAttribute(FriendsOnAtt.name, data.name);
          //this.FriendsOnList.push(FriendsOnCard);
    //});

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

    
    this.shadowRoot?.appendChild(section3);


    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);

    
  
  }
}

customElements.define("my-home", Home);
