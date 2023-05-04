import InputPasswordStyle from "./InputPassword.css"


class InputPassword extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }


        render() {

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = InputPasswordStyle;
            this.shadowRoot?.appendChild(css);

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <input type="password" id="inputPassword" placeholder="Password">
                `;
            }

            
        }
}

customElements.define("input-password", InputPassword);
export default InputPassword;