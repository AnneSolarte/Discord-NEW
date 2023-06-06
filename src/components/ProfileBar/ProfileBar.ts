
import { appState, dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import ProfileBarStyle from "./ProfileBar.css"
    
class ProfileBar extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
    
        connectedCallback() {
            this.render();
        }

        close(){
            dispatch(navigate(Screens.HOME))
        }

    render() {

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="ProfileBar">
                    <div class="block1">
                        <p class="text">My acount</p>
                    </div>
                    <img onclick="close()" class="Icon"src="/img/x_icon.png"
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