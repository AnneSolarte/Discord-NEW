
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
                    <div class="CanalDiv">
                        <div class="canalDiv2">
                            <img class="Icon" src="/img/numeral.png">
                            <p>General</p>
                        </div>
                        <div class="canalDiv3">
                            <img class="Icon" src="/img/config_icon.png">
                            <img class="Icon" src="/img/user_icon.png">
                        </div>
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