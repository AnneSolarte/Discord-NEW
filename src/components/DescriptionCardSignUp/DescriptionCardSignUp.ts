
import DescriptionCardSignUpStyle from "./DescriptionCardSignUp.css"

class DescriptionCardSignUp extends HTMLElement {

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
                    <p class="text">You need an account?</p>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = DescriptionCardSignUpStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("description-signup", DescriptionCardSignUp);
export default DescriptionCardSignUp;