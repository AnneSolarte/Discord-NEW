
import LandingTextStyle from "./LandingText.css"

class LandingText extends HTMLElement {

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
                <div class="section2">
                    <h1 class="title">IMAGINE A PLACE</h1>
                    <p id="textBlock"...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = LandingTextStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("friends-div", LandingText);
export default LandingText;