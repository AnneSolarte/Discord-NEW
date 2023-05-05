import ServersChannelStyle from "./ServersChannel.css";
import Servers, { ServerAtt } from "../../components/Servers/Servers";
import FriendsOnline, { FriendsOnAtt } from "../../components/FriendsOnline/FriendsOnline";
import User, { UserAtt } from "../../components/User/user";
import WriteBar from "../../components/WriteBar/WriteBar";
import ServerBar from "../../components/ServerBar/ServerBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import ChatDiv from "../../components/ChatDiv/ChatDiv";
import { getPosts } from "../../store/actions";
import { getFriends } from "../../store/actions";
import { getServers} from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";


export default class ServersChannel extends HTMLElement {
  ServersList: Servers[] = [];
  FriendsOnList: FriendsOnline[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (appState.friends.length === 0) {
      const action = await getFriends();
      dispatch(action);
    } if (appState.servers.length === 0) {
      const actions = await getServers();
      dispatch(actions);
    } if (appState.post.length === 0) {
      const actions = await getPosts();
      dispatch(actions);
    } else {
      this.render();
    }
  }

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ServersChannelStyle;
        this.shadowRoot?.appendChild(css);

    }

    appState.servers.forEach((data) => {
        const ServersCard = this.ownerDocument.createElement("my-servers") as Servers;
        ServersCard.setAttribute(ServerAtt.img, data.img);
        this.ServersList.push(ServersCard);
    });


    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersCards = this.ownerDocument.createElement("div")
    ServersCards.className = 'ServerSection'
    this.ServersList.forEach((ServersCard) => {
        ServersCards.appendChild(ServersCard)
    });
    section1.appendChild(ServersCards)
    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    const serverDiv = this.ownerDocument.createElement("server-div") as ServerDiv;
    section2.appendChild(serverDiv)
    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'ChatSection'

    const serverBar = this.ownerDocument.createElement("server-bar") as ServerBar;
    section3.appendChild(serverBar)

    const chatDiv = this.ownerDocument.createElement("chat-div") as ChatDiv;
    section3.appendChild(chatDiv);

    const writeBar = this.ownerDocument.createElement("write-bar") as WriteBar;
    section3.appendChild(writeBar)
    this.shadowRoot?.appendChild(section3);


    
    

    const DataFriendsOnline = appState.friends.filter((user)=>{
        return user.mood === "online"
    })

    DataFriendsOnline.forEach((data) => {
      const FriendsOnCard = this.ownerDocument.createElement("friends-online") as FriendsOnline;
          FriendsOnCard.setAttribute(FriendsOnAtt.img, data.img);
          FriendsOnCard.setAttribute(FriendsOnAtt.name, data.name);
          this.FriendsOnList.push(FriendsOnCard);
    });

    const membersSection = this.ownerDocument.createElement("section")
    membersSection.className = 'membersSection'

    const membersDiv = this.ownerDocument.createElement("members-div")
    membersSection.appendChild(membersDiv)

    const members = this.ownerDocument.createElement("div")
    members.className = 'members'
    this.FriendsOnList.forEach((Card) => {
      members.appendChild(Card)
    });
    membersSection.appendChild(members)
    this.shadowRoot?.appendChild(membersSection);
    
    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);


    
  
  }
}

customElements.define("servers-channel", ServersChannel);
