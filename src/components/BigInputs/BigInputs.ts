
import BigInputstyle from "./BigInput.css"

export enum BigInputsAtt {
    "name" = "name",
}

class BigInputs extends HTMLElement {
    name?: string;

    static get observedAttributes() {
        const attrs: Record<BigInputsAtt, null> = {
            name: null
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
        propimg: BigInputsAtt,
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
                <input class="BigInput" type="${this.name}" placeholder="${this.name}">
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = BigInputstyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("big-input", BigInputs);
export default BigInputs;