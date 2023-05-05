
import PostCardStyle from "./PostCard.css"

export enum PostCardAtt {
    "name" = "name",
    "time" = "time",
    "info" = "info",
    "img" = "img",
}

class PostCard extends HTMLElement {
    img?: string;
    name?: string;
    time?: string;
    info?: string;

    static get observedAttributes() {
        const attrs: Record<PostCardAtt, null> = {
            img: null,
            name: null,
            info: null,
            time: null,
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
        propimg: PostCardAtt,
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
                <div class="Post">
                    <div class="dataPost">
                        <p class="PostName">${this.name}</p>
                        <p class="PostTime">Posted ${this.time}min ago</p>
                    </div>
                <h2 class="title">${this.info}</h2>
                <img class="PostImg" src="${this.img}">
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = PostCardStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("post-card", PostCard);
export default PostCard;