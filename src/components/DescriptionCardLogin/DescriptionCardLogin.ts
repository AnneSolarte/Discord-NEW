
import DescriptionCardLoginStyle from "./DescriptionCardLogin.css"

class DescriptionCardLogin extends HTMLElement {

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
                    <p class="text">Do you already have an account?</p>
                `;
                
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = DescriptionCardLoginStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("description-login", DescriptionCardLogin);
export default DescriptionCardLogin;