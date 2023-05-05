
import ChatDivStyle from "./ChatDiv.css"

class ChatDiv extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="chatDiv">
                    <h2 class="title">Welcome to</h2>
                    <h2 class="title">AnneSunart's server</h2>
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