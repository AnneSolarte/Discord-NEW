
import { appState } from "../../store";
import ConfigDivStyle from "./ConfigDiv.css"

class ConfigDiv extends HTMLElement {


    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ConfigDivStyle;
            this.shadowRoot?.appendChild(css);

            const barCanals = this.ownerDocument.createElement("section");
            barCanals.className = "section2Div"

            const NameServer =  this.ownerDocument.createElement("p");
            NameServer.className = "textBlock1"
            NameServer.textContent= "USER SETTINGS"

            const iconText =  this.ownerDocument.createElement("img");
            iconText.className = "imgLine"
            iconText.src= "/img/line.png"
            
            const Channels =  this.ownerDocument.createElement("p");
            Channels.className = "text"
            Channels.textContent= "My account"
            

            barCanals.appendChild(NameServer)
            barCanals.appendChild(iconText)
            barCanals.appendChild(Channels)

            this.shadowRoot?.appendChild(barCanals);

            
        }
}

customElements.define("config-div", ConfigDiv);
export default ConfigDiv;