
import ChatDivStyle from "./ChatDiv.css"
export enum Server {
    "name" = "name",
}

class ChatDiv extends HTMLElement {
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

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="chatDiv">
                    <h2 class="title">Welcome to</h2>
                    <h2 class="title">${this.name}</h2>
                    <p class="text">This is the beginning of this server</p>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ChatDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("chat-div", ChatDiv);
export default ChatDiv;