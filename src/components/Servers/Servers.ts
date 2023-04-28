export enum ServerAtt {
    "img" = "img",
}

class Servers extends HTMLElement {
    img?: string;
    description?: string;

    static get observedAttributes() {
        const attrs: Record<ServerAtt, null> = {
            img: null,
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
        propimg: ServerAtt,
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
                <link rel="stylesheet" href="./App/index.css">
                <div class="serversDiv">
                    <img class="serverImg" src="${this.img}">
                </div>
                `;
            }
        }
}

customElements.define("my-servers", Servers);
export default Servers;