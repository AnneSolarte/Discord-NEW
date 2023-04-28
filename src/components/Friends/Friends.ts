export enum FriendsAtt {
    "img" = "img",
    "name" = "name",
    "mood" = "mood"
}

class Friends extends HTMLElement {
    img?: string;
    name?: string;
    mood?: string;

    static get observedAttributes() {
        const attrs: Record<FriendsAtt, null> = {
            img: null,
            name: null,
            mood: null
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
        propimg: FriendsAtt,
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
                <div class="FriendsDiv">
                    <img class="friendsImg" src="${this.img}${this.mood}.png">
                    <p class="FriendsName">${this.name}</p>
                </div>
                `;
            }
        }
}

customElements.define("my-friends", Friends);
export default Friends;