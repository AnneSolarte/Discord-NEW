import { addObserver, appState, dispatch } from "../../store/index";
import { getServer } from "../../store/actions";

import ServerStyle from "./Servers.css"

class Servers extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);
    }

    async connectedCallback() {
        if(appState.Servers.length === 0) {
            dispatch( await getServer())
            this.render();
        } else {
            this.render();
        }
      }

    async render() {
        if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;
        }

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ServerStyle;
        this.shadowRoot?.appendChild(css);


        const servers = this.ownerDocument.createElement("section")
        servers.className = 'Servers'

        appState.Servers.forEach(async (p)=>{
            const serverImg = this.ownerDocument.createElement("img");
            serverImg.src = p.img
            serverImg.className = "Icon"
            servers.appendChild(serverImg) 
        }); 
        
        this.shadowRoot?.appendChild(servers);   
    }
}

customElements.define("my-servers", Servers);
export default Servers;