
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

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="section2Div">
                    <p id="textBlock1">AnneSunart’s server</p>
                    <img id="imgLine" src="/img/line.png">
                    <div class="section2Div2">
                        <p>TEXT CHANNELS</p>
                        <img class="masIcon"src="/img/mas.png">
                    </div>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ServerDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("server-div", ServerDiv);
export default ServerDiv;