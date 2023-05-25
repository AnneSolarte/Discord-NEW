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
                        <div class="ForumCanalDiv2">
                            <img class="Icon" src="/img/Forum_icon.png">
                            <p>General</p>
                        </div>
                        // <div class="ForumCanalDiv3">
                        //     <img class="Icon" src="/img/config_icon.png">
                        //     <img class="Icon" src="/img/user_icon.png">
                        // </div>
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