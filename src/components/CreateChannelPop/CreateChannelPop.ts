import CreateChannelPopStyle from "./CreateChannelPop.css"
import { TextCanalDiv } from "../export";
import {ForumCanalDiv} from "../export";

class CreateChannelPop extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    CreateChannel(){

    }
    
    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = CreateChannelPopStyle;
            this.shadowRoot?.appendChild(css);

    const CreateChannelPop = this.ownerDocument.createElement("section")
    CreateChannelPop.className = 'CreateChannelPop'

    const channels = this.ownerDocument.createElement("section")
    channels.className = 'channels'

    const TextCanalDiv = this.ownerDocument.createElement("text-canal") as TextCanalDiv;
    channels.appendChild(TextCanalDiv);

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
    })
    buttons.appendChild(CancelButton);

    const DoneButton = this.ownerDocument.createElement("button");
    DoneButton.innerText = "Done";
    DoneButton.className = "DoneButton"
    DoneButton.addEventListener("click", this.CreateChannel)
    buttons.appendChild(DoneButton);
    
    CreateChannelPop.appendChild(buttons)
    this.shadowRoot?.appendChild(CreateChannelPop);
                 
    }
}

customElements.define("create-channel", CreateChannelPop);
export default CreateChannelPop;