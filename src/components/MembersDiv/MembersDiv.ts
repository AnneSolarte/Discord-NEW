
import MembersDivStyle from "./MembersDiv.css"

class MembersDiv extends HTMLElement {
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
                    <div class="membersDiv">
                        <p class="text">Members -- 2 </p>
                    </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = MembersDivStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("members-div", MembersDiv);
export default MembersDiv;