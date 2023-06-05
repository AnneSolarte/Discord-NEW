import { addObserver, appState, dispatch } from "../../store/index";
import { getServer, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";

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
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ServerStyle;
        this.shadowRoot?.appendChild(css);


        const servers = this.ownerDocument.createElement("section")
        servers.className = 'Servers'

        appState.Servers.forEach((p)=>{
            const serverImg = this.ownerDocument.createElement("img");
            serverImg.src = p.img
            serverImg.className = "Icon"
            serverImg.addEventListener("click", (e:any)=>{
                const serverName = p.name
                dispatch(navigate(Screens.SERVERS))
                return serverName
            })
            servers.appendChild(serverImg) 
        }); 

        this.shadowRoot?.appendChild(servers);   
    }
}

customElements.define("my-servers", Servers);
export default Servers;