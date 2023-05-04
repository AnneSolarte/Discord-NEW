
import FriendsDivStyle from "./FriendsDiv.css"

class FriendsDiv extends HTMLElement {

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
                <div class="section2Div">
                    <p id="textBlock1">Find or start a conversation</p>
                    <img id="imgLine" src="/img/line.png">
                    <div class="textBlock2">
                        <img class="friendsIcon1"src="/img/friends.png"
                        <p>Friends</p>
                    </div>
                    <div class="section2Div2">
                        <p>DIRECT MESSAGES</p>
                        <img id="masIcon"src="/img/mas.png">
                    </div>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = FriendsDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("friends-div", FriendsDiv);
export default FriendsDiv;