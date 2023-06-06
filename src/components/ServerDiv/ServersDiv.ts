
import { appState } from "../../store";
import ServerDivStyle from "./ServersDiv.css"

class ServerDiv extends HTMLElement {


    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ServerDivStyle;
            this.shadowRoot?.appendChild(css);

            const barCanals = this.ownerDocument.createElement("section");
            barCanals.className = "section2Div"

            const NameServer =  this.ownerDocument.createElement("p");
            NameServer.className = "textBlock1"
            NameServer.textContent= appState.serverState.name

            const iconText =  this.ownerDocument.createElement("img");
            iconText.className = "imgLine"
            iconText.src= "/img/line.png"

            const SectionChannel = this.ownerDocument.createElement("section");
            SectionChannel.className = "section2Div2"
            
            const Channels =  this.ownerDocument.createElement("p");
            Channels.className = ""
            Channels.textContent= "TEXT CHANNELS"

            const iconAdd =  this.ownerDocument.createElement("img");
            iconAdd.className = "masIcon"
            iconAdd.src= "/img/mas.png"
            

            barCanals.appendChild(NameServer)
            barCanals.appendChild(iconText)
            SectionChannel.appendChild(Channels)
            SectionChannel.appendChild(iconAdd)
            barCanals.appendChild(SectionChannel)

            this.shadowRoot?.appendChild(barCanals);

            
        }
}

customElements.define("server-div", ServerDiv);
export default ServerDiv;