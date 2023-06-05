import TextCanalDivStyle from "./TextCanalDiv.css"


export enum Serve {
    "name" = "name",
}

class TextCanalDiv extends HTMLElement {
    name?: string;

    static get observedAttributes() {
        const attrs: Record<Serve, null> = {
            name: null,
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
        propimg: Serve,
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
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = TextCanalDivStyle;
            this.shadowRoot?.appendChild(css);

            const TextCanalDiv = this.ownerDocument.createElement("section");
            TextCanalDiv.className = "TextCanalDiv"

            const iconText =  this.ownerDocument.createElement("img");
            iconText.className = "Icon"
            iconText.src= "/img/numeral.png"

            const canal =  this.ownerDocument.createElement("p");
            canal.className = "text"
            canal.textContent= String(this.name)

            TextCanalDiv.appendChild(iconText)
            TextCanalDiv.appendChild(canal)

            
            this.shadowRoot?.appendChild(TextCanalDiv);
            
        }
}

customElements.define("text-canal", TextCanalDiv);
export default TextCanalDiv;