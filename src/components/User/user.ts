import { appState } from "../../store";
import UserStyle from "./user.css"

export enum UserAtt {
    "img" = "img",
    "name" = "name",
    "uid" = "uid"
}

class User extends HTMLElement {
    img?: string;
    name?: string;
    uid?: string;

    static get observedAttributes() {
        const attrs: Record<UserAtt, null> = {
            img: null,
            name: null,
            uid: null
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
        propimg: UserAtt,
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
                <div class="sectionUser">
                    <img id="userImg" src="/img/user.png">
                    <div class="sectionUserData">
                        <p class="userText">${appState.user} </p>
                        <p class="userText">#1299</p>
                    </div>
                    <img id="configImg" src="/img/config.png">
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = UserStyle;
            this.shadowRoot?.appendChild(css);
        }
}

customElements.define("my-user", User);
export default User;