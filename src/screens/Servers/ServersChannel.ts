import ServersChannelStyle from "./ServersChannel.css";
import { navigate, SaveServer } from "../../store/actions";
import User from "../../components/User/user";
import WriteBar from "../../components/WriteBar/WriteBar";
import ServerBar from "../../components/ServerBar/ServerBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import ChatDiv from "../../components/ChatDiv/ChatDiv";
import { Screens } from "../../types/navigation";
import { addObserver, appState, dispatch } from "../../store/index";
import { MessageCard, ServersSect, TextCanalDiv } from "../../components/export";
import {Servers} from "../../components/export";
import { Server } from "../../types/servers";
import firebase from "../../utils/firebase";

const formData: Server = {
  id: "",
  name: "",
  img: "",
  createdAt: "",
};
export default class ServersChannel extends HTMLElement {

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

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ServersChannelStyle;
        this.shadowRoot?.appendChild(css);

    }

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersDiv = this.ownerDocument.createElement("servers-sect") as ServersSect;
    section1.appendChild(ServersDiv)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'

    const serverName = this.ownerDocument.createElement("server-div") as ServerDiv;
    section2.appendChild(serverName)

    const canal = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    section2.appendChild(canal)

    this.shadowRoot?.appendChild(section2);

    const ChatSection = this.ownerDocument.createElement("section")
    ChatSection.className = 'ChatSection'


    const serverBar = this.ownerDocument.createElement("server-bar") as ServerBar;
    serverBar.className = "serverBar"
    ChatSection.appendChild(serverBar)

    const writeBar = this.ownerDocument.createElement("write-bar") as WriteBar;
    ChatSection.appendChild(writeBar)

    const Messages = this.ownerDocument.createElement("message-card") as MessageCard;
    ChatSection.appendChild(Messages)

    this.shadowRoot?.appendChild(ChatSection);

    const membersSection = this.ownerDocument.createElement("section")
    membersSection.className = 'membersSection'

    const membersDiv = this.ownerDocument.createElement("members-div")
    membersSection.appendChild(membersDiv)

    this.shadowRoot?.appendChild(membersSection);
    
    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);


  
    
  
  }
}

customElements.define("servers-channel", ServersChannel);
