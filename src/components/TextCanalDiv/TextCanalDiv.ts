import TextCanalDivStyle from "./TextCanalDiv.css"

class TextCanalDiv extends HTMLElement {

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
                    <div class="TextCanalDiv">
                            <img class="Icon" src="/img/numeral.png">
                            <p>General</p>
                    </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = TextCanalDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("text-canal", TextCanalDiv);
export default TextCanalDiv;