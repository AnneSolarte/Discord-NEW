
import ServerBarStyle from "./ServerBar.css"

export enum Server {
    "name" = "name",
}
    
class ServerBar extends HTMLElement {
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
                <div class="serverBar">
                    <div class="block1">
                        <img class="Icon"src="/img/numeral_violet.png"
                        <p>${this.name}</p>
                    </div>
                    <div class="block2">
                        <img class="Icon"src="/img/user_icon.png">
                        <div class="searchBar">
                            <input id="inputSearch" type="" placeholder="Search">
                            <img id="Icon" src="/img/search_icon.png">
                        </div>
                        <img class="Icon"src="/img/inbox_icon.png">
                        <img class="Icon"src="/img/help_icon.png">
                    </div>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ServerBarStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("server-bar", ServerBar);
export default ServerBar;