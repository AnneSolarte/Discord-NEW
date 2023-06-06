
import { appState } from "../../store";
import ProfileBarStyle from "./ProfileBar.css"
    
class ProfileBar extends HTMLElement {

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
                <div class="ProfileBar">
                    <div class="block1">
                        <p class="text">My acount</p>
                    </div>
                    <img class="Icon"src="/img/x_icon.png"
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = ProfileBarStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("profile-bar", ProfileBar);
export default ProfileBar;