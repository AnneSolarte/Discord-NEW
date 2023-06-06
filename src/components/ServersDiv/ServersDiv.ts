
import { appState, dispatch } from "../../store";
import { GetUsers, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import firebase from "../../utils/firebase";
import { Servers, TextCanalDiv } from "../export";
import { Server } from "../../types/servers";



const formData: Server = {
    id: "",
    name: "",
    img: "",
    createdAt: "",
  };
class ServersSection extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
    
        connectedCallback() {
            this.render();
        }

        changeName(e: any) {
            formData.name = e?.target?.value;
          }
        

    render() {
            const ServersSection = this.ownerDocument.createElement("section")
            ServersSection.className = 'ServersSection'
        
            const iconHome = this.ownerDocument.createElement("img")
            iconHome.className = "Icon"
            iconHome.src= "/img/Server0.png"
            iconHome.addEventListener("click", () =>{
              dispatch(navigate(Screens.HOME))
            })
            ServersSection.appendChild(iconHome)
        
            const iconAdd = this.ownerDocument.createElement("img")
            iconAdd.className = "Icon"
            iconAdd.src = "/img/Server01.png"
            iconAdd.addEventListener("click", () =>{
              CreateChannelPop.style.display = 'flex';
            })
            ServersSection.appendChild(iconAdd)
        
            const servers = this.ownerDocument.createElement("my-servers") as Servers;
            ServersSection.appendChild(servers)
            
            const iconSearch = this.ownerDocument.createElement("img")
            iconSearch.className = "Icon"
            iconSearch.src= "/img/Server02.png"
            iconSearch.addEventListener("click", async () =>{
              dispatch(await GetUsers());
              dispatch(navigate(Screens.AddFRIENDS))
              
            })
            ServersSection.appendChild(iconSearch)

            
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
    inputImg.className = "input"
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
    })
    buttons.appendChild(CancelButton);

    const DoneButton = this.ownerDocument.createElement("button");
    DoneButton.innerText = "Done";
    DoneButton.className = "DoneButton"
    DoneButton.addEventListener("click", async () => {
      CreateChannelPop.style.display = 'none';
    })
    buttons.appendChild(DoneButton);
    
    CreateChannelPop.appendChild(buttons)

    this.shadowRoot?.appendChild(ServersSection);
    this.shadowRoot?.appendChild(CreateChannelPop);
        }
}

customElements.define("servers-sect", ServersSection);
export default ServersSection;