
import CreatePostBarStyle from "./CreatePostBar.css"
import ButtonPost from "../ButtonPost/ButtonPost";

class CreatePostBar extends HTMLElement {

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
                <div class="CreatePostBar">
                        <img class="Icon"src="/img/search_icon.png">
                        <p id="inputSearch">Create a new post...</p>
                        <button-post></button-post>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = CreatePostBarStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("create-post", CreatePostBar);
export default CreatePostBar;