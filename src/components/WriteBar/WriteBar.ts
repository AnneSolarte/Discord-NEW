
import WriteBarStyle from "./WriteBar.css"

class WriteBar extends HTMLElement {

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
                <div class="WriteBar">
                    <img class="friendsIcon1"src="/img/upload_icon.png">
                    <div class="blockIcons">
                        <img class="Icons"src="/img/gift_icon.png">
                        <img class="Icons"src="/img/gif_icon.png">
                        <img class="Icons"src="/img/doc_icon.png">
                        <img class="Icons"src="/img/emoji_icon.png">
                    </div>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = WriteBarStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("write-bar", WriteBar);
export default WriteBar;