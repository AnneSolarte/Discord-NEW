
import MembersDivStyle from "./MembersDiv.css"

export enum MembersAtt {
    "length" = "length"
}
class MembersDiv extends HTMLElement {
    length?: number;

    static get observedAttributes() {
        const attrs: Record<MembersAtt, null> = {
            length: null,
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
        propimg: MembersAtt,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propimg) {
                case 'length':
                this.length = JSON.parse(String(newValue));
                break;

            }

            this.render();
        }
        
    render() {

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                    <div class="membersDiv">
                        <p class="text">Members -- 2 </p>
                        <p></p>
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