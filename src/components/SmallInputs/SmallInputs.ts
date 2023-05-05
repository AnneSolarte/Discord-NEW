
import SmallInputstyle from "./SmallInputs.css"

export enum SmallInputsAtt {
    "name" = "name",
}

class SmallInputs extends HTMLElement {
    name?: string;

    static get observedAttributes() {
        const attrs: Record<SmallInputsAtt, null> = {
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
        propimg: SmallInputsAtt,
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
                <div class="SmallInput">
                    <input class="Input" type="" placeholder="${this.name}">
                    <img class="arrowDown" src="/img/arrow_down.png">
                </div>
                
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = SmallInputstyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("small-input", SmallInputs);
export default SmallInputs;