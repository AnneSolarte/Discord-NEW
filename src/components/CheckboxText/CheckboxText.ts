import CheckBoxTextStyle from "./CheckBoxText.css"

class CheckBoxText extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = CheckBoxTextStyle;
            this.shadowRoot?.appendChild(css);

            const checkboxText = this.ownerDocument.createElement("input");
            checkboxText.type = "checkbox";
            checkboxText.className = "checkbox"

            
        }
}

customElements.define("checkbox-text", CheckBoxText);
export default CheckBoxText;