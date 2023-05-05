
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
                <div class="DescriptionDiv">
                    <p class="text">Do you already have an account?</p>
                    <p><a class="link" href="https://example.com">Login</a></p>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = DescriptionCardLoginStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("description-login", DescriptionCardLogin);
export default DescriptionCardLogin;