
import ServerDivStyle from "./ServersDiv.css"
export enum Server {
    "name" = "name",
}

class ServerDiv extends HTMLElement {
    name?: string;

    static get observedAttributes() {
        const attrs: Record<Server, null> = {
            name: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    attributeChangedCallback(
        propimg: Server,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propimg) {
                default:
                this[propimg] = newValue;
                break;
            }

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
            NameServer.textContent= String(this.name)

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