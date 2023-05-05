
import "./screens/export"
import "./components/export"

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {

        const window = this.ownerDocument.createElement('post-channel');
        this.shadowRoot?.appendChild(window);
    }
}

customElements.define('app-container', AppContainer)