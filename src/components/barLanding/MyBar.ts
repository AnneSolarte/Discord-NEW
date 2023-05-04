
import MyBarStyle from "./MyBar.css"

class MyBar extends HTMLElement {

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
                <div class="barra">
                    <img src="/img/logo.png">
                    <p>¡Welcome begginer!</p>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = MyBarStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("my-bar", MyBar);
export default MyBar;