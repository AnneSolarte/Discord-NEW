import InputEmailStyle from "./InputEmail.css"


class InputEmail extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }


        render() {

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = InputEmailStyle;
            this.shadowRoot?.appendChild(css);

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <input type="email" id="InputEmail" placeholder="Email">
                `;
            }

            
        }
}

customElements.define("input-email", InputEmail);
export default InputEmail;