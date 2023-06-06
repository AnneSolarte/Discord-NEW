import ServersChannelStyle from "./ServersChannel.css";
import { navigate, SaveServer } from "../../store/actions";
import User from "../../components/User/user";
import WriteBar from "../../components/WriteBar/WriteBar";
import ServerBar from "../../components/ServerBar/ServerBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import ChatDiv from "../../components/ChatDiv/ChatDiv";
import { Screens } from "../../types/navigation";
import { addObserver, appState, dispatch } from "../../store/index";
import TextCanalDiv, { Serve } from "../../components/TextCanalDiv/TextCanalDiv";

export default class ServersChannel extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
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

    const capa = this.ownerDocument.createElement("section")
    capa.className = 'capa'
    this.shadowRoot?.appendChild(capa);

    const iconHome = this.ownerDocument.createElement("img")
    iconHome.className = "Icon"
    iconHome.src= "/img/Server0.png"
    section1.appendChild(iconHome)


    const iconSearch = this.ownerDocument.createElement("img")
    iconSearch.className = "Icon"
    iconSearch.src= "/img/Server02.png"
    section1.appendChild(iconSearch)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    section2.addEventListener("click", () => {
      dispatch(navigate(Screens.POST));
    });

    const serverName = this.ownerDocument.createElement("server-div") as ServerDiv;
    section2.appendChild(serverName)


    const canal = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    section2.appendChild(canal)

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
