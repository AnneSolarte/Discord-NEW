import ForumCanalDivStyle from "./ForumCanalDiv.css"

class ForumCanalDiv extends HTMLElement {

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
                    <div class="ForumCanalDiv">
                            <img class="Icon" src="/img/Forum_icon.png">
                            <p>General</p>
                    </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ForumCanalDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("forum-canal", ForumCanalDiv);
export default ForumCanalDiv;