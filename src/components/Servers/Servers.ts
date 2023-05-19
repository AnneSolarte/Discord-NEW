import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";

import ServerStyle from "./Servers.css"
export enum ServerAtt {
    "img" = "img",
}

class Servers extends HTMLElement {
    img?: string;
    description?: string;

    static get observedAttributes() {
        const attrs: Record<ServerAtt, null> = {
            img: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propimg: ServerAtt,
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
            css.innerHTML = ServerStyle;
            this.shadowRoot?.appendChild(css);

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="serversDiv">
                    <img class="serverImg" src="${this.img}">
                </div>
                `;
            }

            
        }
}

customElements.define("my-servers", Servers);
export default Servers;