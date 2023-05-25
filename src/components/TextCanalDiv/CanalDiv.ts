import CanalDivStyle from "./CanalDiv.css"

class CanalDiv extends HTMLElement {

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
                    <div class="CanalDiv">
                        <div class="canalDiv2">
                            <img class="Icon" src="/img/numeral.png">
                            <p>General</p>
                        </div>
                        // <div class="canalDiv3">
                        //     <img class="Icon" src="/img/config_icon.png">
                        //     <img class="Icon" src="/img/user_icon.png">
                        // </div>
                    </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = CanalDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("text-canal", CanalDiv);
export default CanalDiv;