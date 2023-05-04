import FriendsOnStyle from "./FriendsOnStyle.css"

export enum FriendsOnAtt {
    "img" = "img",
    "name" = "name",
}

class FriendsOnline extends HTMLElement {
    img?: string;
    name?: string;

    static get observedAttributes() {
        const attrs: Record<FriendsOnAtt, null> = {
            img: null,
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
        propimg: FriendsOnAtt,
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
                <div class="FriendsOnlineDiv">
                    <img class="friendsOnImg" src="${this.img}online.png">
                    <p class="FriendsOnName">${this.name}</p>
                </div>
                `;
            }
            
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = FriendsOnStyle;
            this.shadowRoot?.appendChild(css);
        }
}

customElements.define("friends-online", FriendsOnline);
export default FriendsOnline;