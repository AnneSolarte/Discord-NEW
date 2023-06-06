import PostCreateChannelStyle from "./PostCreateChannel.css";
import User from "../../components/User/user";
import PostCard from "../../components/PostCard/PostCard";
import {ServersSect, TextCanalDiv} from "../../components/export";
import PostBar from "../../components/PostBar/PostBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import { addObserver, appState, dispatch } from "../../store/index";
import { CreatePostBarClick } from "../../components/export";


export default class PostCreateChannel extends HTMLElement {

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
        css.innerHTML = PostCreateChannelStyle;
        this.shadowRoot?.appendChild(css);

    }

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersDiv = this.ownerDocument.createElement("servers-sect") as ServersSect;
    section1.appendChild(ServersDiv)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
   
    const serverDiv = this.ownerDocument.createElement("server-div") as ServerDiv;
    section2.appendChild(serverDiv)

    const canal = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    section2.appendChild(canal)

    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'PostSection'

    const postBar = this.ownerDocument.createElement("post-bar") as PostBar;
    section3.appendChild(postBar)

    const createPostBar = this.ownerDocument.createElement("create-postclick") as CreatePostBarClick;
    section3.appendChild(createPostBar)

    const PostCards = this.ownerDocument.createElement("post-card") as PostCard;
    section3.appendChild(PostCards)

    this.shadowRoot?.appendChild(section3);

    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);
  
  }
}

customElements.define("postcreate-channel", PostCreateChannel);
