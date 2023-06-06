import PostChannelStyle from "./PostChannel.css";
import PostCard from "../../components/PostCard/PostCard";
import User from "../../components/User/user";
import { TextCanalDiv, Servers } from "../../components/export";
import PostBar from "../../components/PostBar/PostBar";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import { addObserver, appState, dispatch } from "../../store/index";
import { Server } from "../../types/servers";
import firebase from "../../utils/firebase";
import { Screens } from "../../types/navigation";
import { SaveServer, navigate } from "../../store/actions";

const formData: Server = {
  id: "",
  name: "",
  img: "",
  createdAt: "",
};

export default class PostChannel extends HTMLElement {
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
      css.innerHTML = PostChannelStyle;
      this.shadowRoot?.appendChild(css);
    }

    const capa = this.ownerDocument.createElement("section");
    capa.className = "capa";
    this.shadowRoot?.appendChild(capa);

    const section1 = this.ownerDocument.createElement("section");
    section1.className = "Section1";

    const iconHome = this.ownerDocument.createElement("img");
    iconHome.className = "Icon";
    iconHome.src = "/img/Server0.png";
    iconHome.addEventListener("click", () =>{
      dispatch(navigate(Screens.HOME))
    })
    section1.appendChild(iconHome);

    const iconAdd = this.ownerDocument.createElement("img");
    iconAdd.className = "Icon";
    iconAdd.src = "/img/Server01.png";
    iconAdd.addEventListener("click", () => {
      CreateChannelPop.style.display = "flex";
      capa.style.display = "flex";
    });
    section1.appendChild(iconAdd);

    const servers = this.ownerDocument.createElement("my-servers") as Servers;
    section1.appendChild(servers);

    const iconSearch = this.ownerDocument.createElement("img");
    iconSearch.className = "Icon";
    iconSearch.src = "/img/Server02.png";
    iconSearch.addEventListener("click", () => {
    });
    section1.appendChild(iconSearch);

    const ServersCards = this.ownerDocument.createElement("div");
    ServersCards.className = "ServerSection";

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section");
    section2.className = "Section2";

    const serverDiv = this.ownerDocument.createElement(
      "server-div"
    ) as ServerDiv;
    section2.appendChild(serverDiv);

    const canal = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    section2.appendChild(canal);

    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section");
    section3.className = "PostSection";

    const postBar = this.ownerDocument.createElement("post-bar") as PostBar;
    section3.appendChild(postBar);

    const createPostBar = this.ownerDocument.createElement(
      "create-post"
    ) as CreatePostBar;
    section3.appendChild(createPostBar);

    const PostCards = this.ownerDocument.createElement(
      "post-card"
    ) as PostCard;
    section3.appendChild(PostCards);

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

customElements.define("post-channel", PostChannel);
